const graphqlHTTP = require('express-graphql');
const safeEval = require('safe-eval');
const MapperHelper = require('../util/MapperHelper');

// graph deps
const ResolverRoot = require('../graph/ResolverRoot');
const GraphSchema = require('../graph/GraphSchema');

// constants
const {MAPPER_HELP_STR} = require('../util/Constants');

/**
 * To handle graphQL routes
 * */

function getStatus(paymentStatus){
    if(paymentStatus=='SUCCESS') {
        return "SUCCESS";
    }else if(paymentStatus=='FAILED'||paymentStatus=='CANCELLED'||paymentStatus=='USER_DROPPED'){
        return "FAILED";
    }else if(paymentStatus=='PENDING'||paymentStatus=='INCOMPLETE'||paymentStatus=='FLAGGED'){
        return "PENDING";
    }else if(paymentStatus=='INITIALIZED'){
        return "PROCESSING";
    }   
}
exports = module.exports = class GraphQLController {

    constructor(router) {
        // config routes
        router.post('/api/webhook/cashfree',this.updateTransaction);
        router.get('/api/graph-api', this.graphAPI);
        router.post('/api/graph-api', this.graphAPI);
        log.info('Routed', this.constructor.name);
    }

    
    
    async updateTransaction(req,res){
        
        //to do verufy  header--
        res.sendStatus(200);
        console.log("hello--------",req.body);
        if(req.body.data){
            const body=req.body.data;
            console.log(body);
            const transactionId=body?.order?.order_tags?.transaction_id||'';
            let paymentStatus=body?.payment?.payment_status||'PENDING';
            let paymentMethod=body?.payment?.payment_method?.app?.channel;
            paymentStatus= getStatus(paymentStatus);
            console.log("updating bank transaction for status",await _db.BankTransaction.updateOne({_id:transactionId||''},{$set:{gatewayMethod:paymentMethod}}));          //status:paymentStatus, i will set it on frontend ..
            // const led=await _db.Ledger.findOne({linkedBankTransaction:transactionId||''})
            // console.log("fetching ledger",led);
            // now update wallet amount after finding ledger form bank transaction 
            // if(paymentStatus=="SUCCESS"){
            //     console.log("updating wallet for the transaction if transaction success",await _db.Wallet.updateOne({ledger:led._id},{$inc:{bal:body?.payment?.payment_amount}})); 
            // }
        }
}

    async graphAPI(req, res) {
        let mapper;
        let userAgent = req.header('User-Agent');
        req.userAgent = userAgent;
        req.data = {};
        if (req.body && req.body.query) {
            req.body.query = req.body.query.replace(/mapper ?<safejs-[\s\S\d\D\w\Wa-z0-9-.]+?-js>/, match => {
                mapper = match;
                return '';
            });
            if (mapper) mapper = mapper.replace(/(mapper ?<safejs-)|(-js>)/g, '');
        }

        res._json = res.json;
        res.json = function (obj) {
            Object.assign(obj.data || obj, req.data);
            if (mapper && typeof (obj.errors) === 'undefined') {
                try {
                    let code = '(function(data, parent){const help = ()=> parent.help = hm();\n' + mapper + '\nreturn {data, parent};})(data, {})';
                    let {data, parent} = safeEval(code, {
                        data: obj.data || {},
                        hm: () => MAPPER_HELP_STR,
                        ...MapperHelper
                    }, {filename: 'mapper.js', timeout: 2000});
                    Object.assign(obj, parent);
                    obj.data = data;
                    res._json(obj);
                } catch (c) {
                    log.error(c);
                    log.warn('Failing Mapper', mapper, req.param('cacheKey'));
                    res._json({errors: [{message: 'error in mapper.', details: c.message}], data: null, ref: obj});
                }
            } else {
                if (req.forceResponseCode) res.status(req.forceResponseCode);
                res._json(obj);
            }
        };
        graphqlHTTP({
            schema: GraphSchema.schema,
            rootValue: ResolverRoot.bean,
            graphiql: true //process.env.NODE_ENV !== 'production',
        })(req, res);
    }

};
