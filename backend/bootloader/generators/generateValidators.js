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

        const path = join(__dirname, '../../validations', e.name + 'Validator.js');
        console.log(path);
        let content = `
const Validator = require('./Validator');

class ${e.name}Validator extends Validator {

    constructor(...args){
        super(...args);
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
                return true;
            } else return false;
        }).map(d => {
            return `this.${cache[d.name]}Validator = require('./${cache[d.name]}Validator');`;
        }).join('\n')}}
    
    ${e.fields.map(f => `${f.name}(${f.name}) {
        ${lcache[f.name] ? `if(${f.name}) { return (${f.name} instanceof Array) ? (${f.name}.map(val => new this.${lcache[f.name]}Validator(val, this._validateChild).validate())) : 'Please provide an array for the field ${e.name}->${f.name}.'}` :
            cache[f.name] ?
            `return new this.${cache[f.name]}Validator(${f.name}, this._validateChild).validate();` :
            dcache[f.name] ?
                `if(${f.name}){return _db.${e.name}.convertToObjectId(${f.name}) ? false : 'Invalid ID passed for ${e.name}->${f.name}. Please pass a valid Object id.';}else{return false;}` :
                ldcache[f.name] ?
                    `return ${f.name}.map((entityId, idx) =>  _db.${e.name}.convertToObjectId(entityId) ? false : 'Invalid ID passed for ${e.name}->${f.name}[' +idx+']. Please pass a valid Object id.').filter(e => !!e).join(',').trim();` :
                    'return false; // return string containing error message to define error, else send any false value.'}
        }
    `).join('\n\n')}
    
}

exports = module.exports = ${e.name}Validator;

`;

        fs.writeFileSync(path, content);

    });


};
