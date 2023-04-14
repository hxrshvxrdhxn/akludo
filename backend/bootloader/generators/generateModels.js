const {join} = require('path');
const fs = require('fs');
const selected = process.argv.slice(2);

exports = module.exports = function (specs) {
    specs.docs.forEach(e => {
        if(selected.length){
            if(selected.indexOf(e.name) === -1) return;
        }
        const path = join(__dirname, '../../models/mongo', e.name + '.js');
        console.log(path);
        let content = `
/**
 * ${e.name} model
 * */
const MongoDbModel = require('../../bootloader/mongo');
// For Number types better reading
const Float = Number;
const Int = Number;

class ${e.name} extends MongoDbModel {

    /*Define which database to connect to*/
    static get connection() {
        return this.APP_DB;
    }

    /* Needed functions by the MongoDbModel Interface */
    static get Name() {
        return this.name;
    }

    static get Schema() {
        return mongoose => (${renderComplex(e.fields)})
    }

    static get Indexes() {
        return [
        ];
    }
}

exports = module.exports = ${e.name};

`;

        fs.writeFileSync(path, content);
    });


    function renderComplex(fields) {
        const segs = [];
        fields.forEach(f => {
            console.log(f.name);
            if(f.name === "id") return; // ignore id
            switch (f.type.kind) {
                case 'SCALAR':
                    segs.push(`${f.name}: ${f.name.search(/createdAt|updatedAt/i) > -1 ? 'Number' : f.type.name}`);
                    break;
                case 'OBJECT':
                    const ref = f.type.name;
                    if (specs.docs.find(d => d.name === ref)) {
                        segs.push(`${f.name}: {type: mongoose.Schema.Types.ObjectId, ref: '${ref}'}`);
                    } else {
                        segs.push(`${f.name}: ${renderComplex(specs.sdocs.find(d => d.name === ref).fields)}`);
                    }
                    break;
                case 'LIST':
                    const ref2 = f.type.ofType.name;
                    if (f.type.ofType.kind === 'SCALAR') {
                        segs.push(`${f.name}: [${ref2}]`);
                    } else if(f.type.ofType.kind === 'ENUM'){
                        segs.push(`${f.name}: /*${ref2} ${require('../../util/enums/' + ref2).values.join(', ')}*/ [String]`);
                    } else if (specs.docs.find(d => d.name === ref2)) {
                        segs.push(`${f.name}: [{type: mongoose.Schema.Types.ObjectId, ref: '${ref2}'}]`);
                    } else {
                         console.log(ref2)
                        segs.push(`${f.name}: [${renderComplex(specs.sdocs.find(d => d.name === ref2).fields)}]`);
                    }
                    break;
                case 'ENUM':
                    segs.push(`${f.name}: /*${f.type.name}: ${require('../../util/enums/' + f.type.name).values.join(', ')}*/ String`);
                    break;
                case 'NON_NULL':

                    switch (f.type.ofType.kind) {
                        case 'SCALAR':
                            segs.push(`${f.name}: ${f.type.ofType.name}`);
                            break;
                        case 'OBJECT':
                            const ref = f.type.ofType.name;
                            if (specs.docs.find(d => d.name === ref)) {
                                segs.push(`${f.name}: {type: mongoose.Schema.Types.ObjectId, ref: '${ref}'}`);
                            } else {
                                segs.push(`${f.name}: ${renderComplex(specs.sdocs.find(d => d.name === ref).fields)}`);
                            }
                            break;
                        case 'LIST':
                            const ref2 = f.type.ofType.name;
                            if (f.type.ofType.kind === 'SCALAR') {
                                segs.push(`${f.name}: [${ref2}]`);
                            } else if(f.type.ofType.kind === 'ENUM'){
                                segs.push(`${f.name}: /*${ref2}: ${require('../../util/enums/' + ref2).values.join(', ')}*/ [String]`);
                            } else if (specs.docs.find(d => d.name === ref2)) {
                                segs.push(`${f.name}: [{type: mongoose.Schema.Types.ObjectId, ref: '${ref2}'}]`);
                            } else {
                                segs.push(`${f.name}: [${renderComplex(specs.sdocs.find(d => d.name === ref2).fields)}]`);
                            }
                            break;
                        case 'ENUM':
                            segs.push(`${f.name}: /*${f.type.ofType.name}: ${require('../../util/enums/' + f.type.ofType.name).values.join(', ')}*/ String`);
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
