const {join} = require('path');
const fs = require('fs');
const selected = process.argv.slice(2);
exports = module.exports = function (specs) {


    [...(specs.docs)].forEach(e => {
        if(selected.length){
            if(selected.indexOf(e.name) === -1) return;
        }
        console.log(`list${e.name}(criteria: String, limit: Int, offset: Int): [${e.name}]`);
        console.log(`get${e.name}(id: String!): ${e.name}\n`);
    });

    [...(specs.docs)].forEach(e => {
        if(selected.length){
            if(selected.indexOf(e.name) === -1) return;
        }
        console.log(`this.${e.name}Resolver = require('./${e.name}Resolver');`);
    });

    [...(specs.docs)].forEach(e => {
        if(selected.length){
            if(selected.indexOf(e.name) === -1) return;
        }
        console.log(`const ${e.name}Service = require('../../services/${e.name}Service');`);
    });

    [...(specs.docs)].forEach(e => {
        if(selected.length){
            if(selected.indexOf(e.name) === -1) return;
        }
        console.log(`
        async list${e.name}({criteria, limit, offset}, {data}) {
        const listResp = await ${e.name}Service.list(this._parseCriteria(criteria), limit, offset, await this._fullUser());
        //{docs, total, limit, offset}
        data[\`list${e.name}Total\`] = data.total = listResp.total;
        data[\`list${e.name}Limit\`] = data.limit = listResp.limit;
        data[\`list${e.name}Offset\`] = data.offset = listResp.offset;
        const user = await this._fullUser();
        return listResp.docs.map(doc => new this.${e.name}Resolver(doc, user));
    }

    async get${e.name}({id}) {
        const user = await this._fullUser();
        const doc = await ${e.name}Service.findOne(id, user);
        return doc ? new this.${e.name}Resolver(doc, user) : null;
    }
        `);
    });


};
