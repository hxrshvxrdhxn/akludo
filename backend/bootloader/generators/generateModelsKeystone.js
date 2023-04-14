const {join} = require('path');
const fs = require('fs');
const selected = process.argv.slice(2);

exports = module.exports = function (specs) {
    specs.docs.forEach(e => {
        if(selected.length){
            if(selected.indexOf(e.name) === -1) return;
        }
        const path = join(__dirname, '../../models/ks', e.name + '.js');
        console.log(path);
        let content = `
/**
 * ${e.name} model
 * */
const keystone = require('../ks');
const Types = keystone.Field.Types;

const ${e.name} = new keystone.List('${e.name}', {
track: true,
nocreate: false,
nodelete: false,
noedit: false,
});

${e.name}.add(${renderComplex(e.fields)});

/**
 * Registration
 */
${e.name}.defaultColumns = 'createdAt, updatedAt, createdBy, updatedBy';
${e.name}.register();

`;

        fs.writeFileSync(path, content);
    });

    function resolveScalar(stype){
        switch(stype){
            case 'Number':
            case 'Float':
            case 'Int':
                return 'Number';
                break;
            case 'String':
                return 'Text';
                break;
            case 'Boolean':
                return 'Boolean';
                break;
            default:
                return 'Text';
        }
    }

    function renderComplex(fields) {
        const segs = [];
        fields.forEach(f => {
            console.log(f.name);
            if(f.name.search(/id|createdAt|updatedAt|createdBy|updatedBy/) > -1) return; // ignore id
            switch (f.type.kind) {
                case 'SCALAR':
                    segs.push(`${f.name}: ${f.name.search(/createdAt|updatedAt/i) > -1 ? '{type: Types.Datetime, initial: false}' : `{type: Types.${resolveScalar(f.type.name)}, initial: true}`}`);
                    break;
                case 'OBJECT':
                    const ref = f.type.name;
                    if (specs.docs.find(d => d.name === ref)) {
                        segs.push(`${f.name}: {type: Types.Relationship, ref: '${ref}',initial: true, required: false, index: false}`);
                    } else {
                        segs.push(`${f.name}: ${renderComplex(specs.sdocs.find(d => d.name === ref).fields)}`);
                    }
                    break;
                case 'LIST':
                    const ref2 = f.type.ofType.name;
                    if (f.type.ofType.kind === 'SCALAR') {
                        segs.push(`${f.name}: {type: Types.TextArray,initial: true, required: false, index: false} /*[${ref2}]*/`);
                    } else if(f.type.ofType.kind === 'ENUM'){
                        segs.push(`${f.name}: {type: Types.SelectArray, options: ${JSON.stringify(require('../../util/enums/' + ref2).values)}, required: false, index: false}`);
                    } else if (specs.docs.find(d => d.name === ref2)) {
                        segs.push(`${f.name}: {type: Types.Relationship, ref: '${ref2}',initial: true, required: false, index: false, many: true}`);
                    } else {
                        segs.push(`${f.name}: {type: Types.List, fields: ${renderComplex(specs.sdocs.find(d => d.name === ref2).fields)}}`);
                    }
                    break;
                case 'ENUM':
                    segs.push(`${f.name}: {type: Types.Select, options: '${require('../../util/enums/' + f.type.name).values.join(', ')}', initial: true}`);
                    break;
                case 'NON_NULL':

                    switch (f.type.ofType.kind) {
                        case 'SCALAR':
                            segs.push(`${f.name}: {type: Types.${resolveScalar(f.type.ofType.name)}, initial: true} /*${f.type.ofType.name}*/`);
                            break;
                        case 'OBJECT':
                            const ref = f.type.ofType.name;
                            if (specs.docs.find(d => d.name === ref)) {
                                segs.push(`${f.name}: {type: Types.Relationship, ref: '${ref}',initial: true, required: false, index: false}`);
                            } else {
                                segs.push(`${f.name}: ${renderComplex(specs.sdocs.find(d => d.name === ref).fields)}`);
                            }
                            break;
                        case 'LIST':
                            const ref2 = f.type.ofType.name;
                            if (f.type.ofType.kind === 'SCALAR') {
                                segs.push(`${f.name}: {type: Types.TextArray,initial: true, required: false, index: false} /*[${ref2}]*/`);
                            } else if(f.type.ofType.kind === 'ENUM'){
                                segs.push(`${f.name}: {type: Types.SelectArray, options: ${JSON.stringify(require('../../util/enums/' + ref2).values)}, required: false, index: false}`);
                            } else if (specs.docs.find(d => d.name === ref2)) {
                                segs.push(`${f.name}: [{type: mongoose.Schema.Types.ObjectId, ref: '${ref2}'}]`);
                            } else {
                                segs.push(`${f.name}: {type: Types.Relationship, ref: '${ref2}',initial: true, required: false, index: false, many: true}`);
                            }
                            break;
                        case 'ENUM':
                            segs.push(`${f.name}: {type: Types.Select, options: '${require('../../util/enums/' + f.type.ofType.name).values.join(', ')}', initial: true}`);
                            break;
                        default:
                            throw new Error('Unknown field ' + f.type.kind + ' ' + f.name);
                    }
                    break;
                default:
                    throw new Error('Unknown field ' + f.type.kind + ' ' + f.name);
            }
        });
        return `{\n${segs.join(',\n')}}`;
    }
};
