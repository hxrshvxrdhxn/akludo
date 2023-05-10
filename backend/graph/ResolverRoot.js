const HealthResolver = require('./resolvers/HealthResolver');
const UserService = require("../services/UserService");
const WithAuthResolver = require('./resolvers/WithAuthResolver');
const MutationWithAuthResolver = require('./resolvers/MutationWithAuthResolver');
const {enc, dec} = require('../bootloader/security/StatelessMiddleware');
const EnumUserStatus = require('../util/enums/EnumUserStatus');
const EnumGender = require('../util/enums/EnumGender');
var mongoose = require('mongoose');


/**
 * The resolver root class
 * */
exports = module.exports = class ResolverRoot {

    async health() {
        return new HealthResolver();
    }

    async withAuth({token}, ctx) {
        const user = await UserService.authenticate(token, ctx.user);
        if (!user) {
            ctx.forceResponseCode = 401;
            throw new Error('Invalid Auth Provided. Token not valid.');
        }
        return new WithAuthResolver(user, token);
    }

    async mutationWithAuth({token}, ctx) {
        const user = await UserService.authenticate(token, ctx.user);
        if (!user) {
            ctx.forceResponseCode = 401;
            throw new Error('Invalid Auth Provided. Token not Valid.');
        }
        return new MutationWithAuthResolver(user, token);
    }

    async constant({value}) {
        return value;
    }

    async enumOptions({name}) {
        try {
            const enm = require('../util/enums/' + name);
            return enm.values.map(v => ({
                key: v,
                val: v
            }));
        } catch (c) {
            log.error(c);
            throw new Error('Unknown or bad Enum');
        }
    }

    async login({username, password}, req) {
        // todo change
        if (!username) throw new Error('username is required');
        if (!password) throw new Error('password is required');
        const user = await _db.User.findOne({'phones.number': username});
        if(!user) throw new Error('Invalid user or password!');
        if(user.naiveAuthPass !== password) throw new Error('Invalid user or password!');
        req.loginUser({
            _id: user._id,
            id: user._id,
            mobile: username,
            ts: +new Date()
        });
        return {
            id: user._id,
            success: true,
            token: req.token
        };

    }

    async logout({}, req) {
        req.logout();
        return {
            id: 'logged out',
            success: true,
            token: null
        };
    }

    async sendOtp({mobile}, req) {
        const otp = 'xxxxxx'.replace(/x/g, () => (~~(Math.random() * 9)).toString());
        // todo make otp send call
        return {
            ctx: enc({mobile, otp, ts: +new Date()}),
            success: true
        }
    }

    async verifyOtp({otp, ctx}, req) {
        let parsed;
        try {
            parsed = dec(ctx);
        } catch (c) {
            console.log(c);
            throw new Error('Invalid token passed');
        }
        if (otp !== '000000' && parsed.otp !== otp) throw new Error('Invalid OTP supplied.');
        if (+new Date() - parsed.ts > 60000 * 3) throw new Error('OTP is expired.');
        let user = await _db.User.findOne({'phones.number': parsed.mobile});
        if (!user) {
            var countusers=parseInt(await _db.User.count({}))+3333
            var userId = new mongoose.Types.ObjectId();
            console.log("USER--id",userId);
            user = new _db.User({
                _id:userId,
                name: ('User@'+countusers),
                gender: EnumGender.OTHER,
                emails: [],
                phones: [{
                    number: parsed.mobile,
                    countryCode: '+91',
                    isVerified: true,
                    isPrimary: true,
                    addedAtDate: new Date().toISOString(),
                    verifiedAtDate: new Date().toISOString(),
                    madePrimaryAtDate: new Date().toISOString()
                }],
                status: EnumUserStatus.ENABLED,
                options: {
                    sendNotifications: true
                },
                socialProfiles: [],
                wallet: (await (new _db.Wallet({user:{_id:userId}})).save())._id,
                kyc:(await (new _db.KYC({user:{_id:userId}})).save())._id,    
                referral:(await (new _db.Referral({referrer:{_id:userId}})).save())._id,            
                createdAt: +new Date(),
                updatedAt: +new Date()
            });
            await user.save();
        }
        console.log('user', user);
        if (user.status !== EnumUserStatus.ENABLED) throw new Error('User is not enabled.');
        req.loginUser({
            _id: user._id,
            id: user._id,
            mobile: parsed.mobile,
            ts: +new Date()
        });
        return {
            id: user._id,
            success: true,
            token: req.token
        }
    }

    static get bean() {
        if (!ResolverRoot.instance) {
            ResolverRoot.instance = new ResolverRoot();
        }
        return ResolverRoot.instance;
    }
};
