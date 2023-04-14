const {join} = require('path');
const fs = require('fs');

exports = module.exports = function (specs) {


    [...(specs.docs)].forEach(e => {
        console.log(`
        async update${e.name}({${e.fields.map(f => f.name).join(', ')}}, {data}) {
        const dto = new ${e.name}DTO({${e.fields.map(f => f.name).filter(f => f !== 'id').join(', ')}});
        const result = await ${e.name}Service.update(id, dto, this._user); //{updateResult, updatedDbObj}
        if (result && result.updateResult) {
            data.updateResult = result.updateResult;
            data.updateResult_${e.name} = result.updateResult;
            return new this.${e.name}Resolver(result.updatedDbObj, this._user);
        } else throw new Error('Unable to update');
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
        console.log(`update${e.name}(${renderComplex(e.fields, 'Input', false)}): ${e.name}`);
    });
};
