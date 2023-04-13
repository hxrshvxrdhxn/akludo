const {join} = require('path');
const fs = require('fs');
const selected = process.argv.slice(2);
exports = module.exports = function (specs) {


    [...(specs.docs), ...(specs.sdocs)].forEach(e => {
            if(selected.length){
                if(selected.indexOf(e.name) === -1) return;
            }
        const lcache = {};
        const cache = {};
        const dcache = {};
        const ldcache = {};
        const sdone = {};
        const rdone = {};

        const path = join(__dirname, '../../graph/resolvers', e.name + 'Resolver.js');
        console.log(path);
        let content = `
            ${e.fields.filter(f => {
            let n;
            if (f.type.ofType && f.type.ofType.name) n = f.type.ofType.name;
            else n = f.type.name;
            if (specs.docs.find(d => d.name === n)) {
                if (f.type.kind === 'LIST') ldcache[f.name] = n;
                else dcache[f.name] = n;
            }
            if (/*specs.docs.find(d => d.name === n) ||*/ specs.sdocs.find(d => d.name === n)) {
                if (f.type.kind === 'LIST') lcache[f.name] = n;
                else cache[f.name] = n;
            }
            return !!(dcache[f.name] || ldcache[f.name]);
        }).map(d => {
            if (sdone[dcache[d.name] || ldcache[d.name]]) return '';
            sdone[dcache[d.name] || ldcache[d.name]] = true;
            return `const ${cache[d.name] || dcache[d.name] || ldcache[d.name]}Service = require('../../services/${cache[d.name] || dcache[d.name] || ldcache[d.name]}Service');`;
        }).filter(e => !!e).join('\n')}
/*
* Resolver for type ${e.name}
*/

class ${e.name}Resolver {

    constructor(data, user){
       if(!data) throw new Error('Data is required in resolver');
       this.data = data;
       this._user = user;
       // Inline imports to avoid cyclic dependency issue
        ${e.fields.filter(f => {
            let n;
            if (f.type.ofType && f.type.ofType.name) n = f.type.ofType.name;
            else n = f.type.name;
            if (specs.docs.find(d => d.name === n)) {
                if (f.type.kind === 'LIST') ldcache[f.name] = n;
                else dcache[f.name] = n;
            }
            if (/*specs.docs.find(d => d.name === n) ||*/ specs.sdocs.find(d => d.name === n)) {
                if (f.type.kind === 'LIST') lcache[f.name] = n;
                cache[f.name] = n;
            }
            return !!(cache[f.name] || dcache[f.name] || ldcache[f.name]);
        }).map(d => {
            if (rdone[cache[d.name] || dcache[d.name] || ldcache[d.name]]) return '';
            rdone[cache[d.name] || dcache[d.name] || ldcache[d.name]] = true;
            return `this.${cache[d.name] || dcache[d.name] || ldcache[d.name]}Resolver = require('./${cache[d.name] || dcache[d.name] || ldcache[d.name]}Resolver');`;
        }).filter(e => !!e).join('\n')}}
    
    ${e.fields.map(f => `async ${f.name}() {
        ${ lcache[f.name] ? `return (this.data.${f.name} || []).map(doc => new this.${cache[f.name]}Resolver(doc, this._user));` :
            cache[f.name] ?
            `if(this.data.${f.name}) return new this.${cache[f.name]}Resolver(this.data.${f.name}, this._user); \n else return null;` :
            dcache[f.name] ?
                `const found = await ${dcache[f.name]}Service.findOne(this.data.${f.name}, this._user); return found ? new this.${dcache[f.name]}Resolver(found, this._user) : null;` :
                ldcache[f.name] ?
                    `const docs = [];\n for(let idx = 0; idx < (this.data.${f.name} || []).length; idx++){docs.push(await ${ldcache[f.name]}Service.findOne(this.data.${f.name}[idx], this._user));}\n return docs.map(doc =>  new this.${ldcache[f.name]}Resolver(doc, this._user));` :
                    `return this.data.${f.name === 'id' ? '_id' : f.name}${f.name.search(/createdAt|updatedAt|_id/) > -1 ? '.toString()' : ''};`}
        }
    `).join('\n\n')}
    
}

exports = module.exports = ${e.name}Resolver;

`;

        fs.writeFileSync(path, content);

    }

    );


};
