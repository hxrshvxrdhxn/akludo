const {join} = require('path');
const fs = require('fs');
const selected = process.argv.slice(2);

exports = module.exports = function (specs) {





    [...(specs.docs)].forEach(e => {
        if(selected.length){
            if(selected.indexOf(e.name) === -1) return;
        }
        console.log(`const ${e.name}DTO = require('../../util/beans/${e.name}DTO');`);
    });

    [...(specs.docs)].forEach(e => {
        if(selected.length){
            if(selected.indexOf(e.name) === -1) return;
        }
        console.log(`
        async create${e.name}({${e.fields.map(f => f.name).filter(f => f !== 'id').join(', ')}}) {
        const dto = new ${e.name}DTO({${e.fields.map(f => f.name).join(', ')}});
        const doc = await ${e.name}Service.create(dto, this._user);
        return doc ? new this.${e.name}Resolver(doc, this._user) : null;
    }
        `);
    });

    function renderComplex(fields, varfix, ignoreId){
        const segs = [];
        fields.forEach(f => {
            if(ignoreId && f.name === 'id') return;
            switch (f.type.kind) {
                case 'SCALAR':
                    segs.push(`${f.name}: ${f.type.name}`);
                    break;
                case 'OBJECT':
                    const ref = f.type.name;
                    if (specs.docs.find(d => d.name === ref)) {
                        segs.push(`${f.name}: String`);
                    } else {
                        segs.push(`${f.name}: ${ref}${varfix}`);
                    }
                    break;
                case 'LIST':
                    const ref2 = f.type.ofType.name;
                    if (f.type.ofType.kind === 'SCALAR') {
                        segs.push(`${f.name}: [${ref2}]`);
                    } else if(f.type.ofType.kind === 'ENUM'){
                        segs.push(`${f.name}: [${ref2}]`);
                    } else if (specs.docs.find(d => d.name === ref2)) {
                        segs.push(`${f.name}: [String]`);
                    } else {
                        segs.push(`${f.name}: [${ref2}${varfix}]`);
                    }
                    break;
                case 'ENUM':
                    segs.push(`${f.name}: ${f.type.name}`);
                    break;
                case 'NON_NULL':

                    switch (f.type.ofType.kind) {
                        case 'SCALAR':
                            segs.push(`${f.name}: ${f.type.ofType.name}`);
                            break;
                        case 'OBJECT':
                            const ref = f.type.ofType.name;
                            if (specs.docs.find(d => d.name === ref)) {
                                segs.push(`${f.name}: String`);
                            } else {
                                segs.push(`${f.name}: ${ref}${varfix}`);
                            }
                            break;
                        case 'LIST':
                            const ref2 = f.type.ofType.name;
                            if (f.type.ofType.kind === 'SCALAR') {
                                segs.push(`${f.name}: [${ref2}]`);
                            } else if(f.type.ofType.kind === 'ENUM'){
                                segs.push(`${f.name}: [${ref2}]`);
                            } else if (specs.docs.find(d => d.name === ref2)) {
                                segs.push(`${f.name}: [String]`);
                            } else {
                                segs.push(`${f.name}: [${ref2}${varfix}]`);
                            }
                            break;
                        case 'ENUM':
                            segs.push(`${f.name}: ${f.type.ofType.name}`);
                            break;
                        default:
                            throw new Error('Unknown field ' + f.type.kind + ' ' + f.name);
                    }
                    break;
                default:
                    throw new Error('Unknown field ' + f.type.kind + ' ' + f.name);
            }
        });
        return `${segs.join(', ')}`;
    }

    [...(specs.docs)].forEach(e => {
        if(selected.length){
            if(selected.indexOf(e.name) === -1) return;
        }
        console.log(`create${e.name}(${renderComplex(e.fields, 'Input', true)}): ${e.name}`);
    });

    [...(specs.sdocs)].forEach(e => {
        if(selected.length){
            if(selected.indexOf(e.name) === -1) return;
        }
        console.log(`input ${e.name}Input{${renderComplex(e.fields, '', false)}}`);
    });
};
