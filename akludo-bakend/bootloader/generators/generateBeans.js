const {join} = require('path');
const fs = require('fs');

const selected = process.argv.slice(2);

exports = module.exports = function (specs) {


    [...(specs.docs), ...(specs.sdocs)].forEach(e => {
        if(selected.length){
            if(selected.indexOf(e.name) === -1) return;
        }

        const cache = {};
        const dcache = {};
        const ldcache = {};

        const path = join(__dirname, '../../util/beans', e.name + 'DTO.js');
        console.log(path);
        let content = `
const Bean = require('./Bean');

class ${e.name}DTO extends Bean {

    constructor(...args){
        super(...args);
        this._payload = args[0] || {};
        ${e.fields.map(d => {
            return `this._orig_${d.name} = this._payload.${d.name};`;
        }).join('\n')}}
    
    ${e.fields.map(f => `get ${f.name}() { return this._payload.${f.name};} \n set ${f.name}(${f.name}){ this._payload.${f.name} = ${f.name};}`).join('\n\n')}
    
}

exports = module.exports = ${e.name}DTO;

`;

        fs.writeFileSync(path, content);

    });


};
