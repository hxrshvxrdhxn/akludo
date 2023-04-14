const {join} = require('path');
const fs = require('fs');

exports = module.exports = function (specs) {
    specs.docs.forEach(e => {
        const path = join(__dirname, '../../models/mysql', e.name + '.js');
        console.log(path);
        let content = `
/**
 * ${e.name} model
 * */
const MySqlDbModel = require('../../bootloader/mysql/orm/MySqlDbModel');

class ${e.name} extends MySqlDbModel {

    /*Define which database to connect to*/
    static get connection() {
        return this.CORE_WRITE;
    }

    /* Needed functions by the MongoDbModel Interface */
    static get Name() {
        return this.name;
    }

    static get Schema() {
        return (DataTypes, sequelize, tableNameFn) => (${renderComplex(e.fields)})
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

    function fieldType(type, name) {
        if (name === 'id') {
            return `{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true}`;
        }
        if (name.search(/createdAt|updatedAt|Date/i) > -1) {
            return "{type: DataTypes.DATE}";
        }
        switch (type.toLowerCase()) {
            case "string":
                return "{type: DataTypes.TEXT}";
            case "number":
                return "{type: DataTypes.DOUBLE}";
            case "int":
                return "{type: DataTypes.BIGINT}";
            case "float":
                return "{type: DataTypes.FLOAT}";
            case "boolean":
                return "{type: DataTypes.BOOLEAN}";
            case "date":
                return "{type: DataTypes.DATE}";
        }
    }


    function renderComplex(fields) {
        const segs = [];
        fields.forEach(f => {
            console.log(f.name);
            switch (f.type.kind) {
                case 'SCALAR':
                    segs.push(`${f.name}: ${fieldType(f.type.name, f.name)}`);
                    break;
                case 'OBJECT':
                    const ref = f.type.name;
                    if (specs.docs.find(d => d.name === ref)) {
                        segs.push(`${f.name}: {type: DataTypes.INTEGER, references: {model: tableNameFn('${ref}'), key: 'id'}}`);
                    } else {
                        segs.push(`${f.name}: ${renderComplex(specs.sdocs.find(d => d.name === ref).fields)}`);
                    }
                    break;
                case 'LIST':
                    const ref2 = f.type.ofType.name;
                    if (f.type.ofType.kind === 'SCALAR') {
                        segs.push(`${f.name}: ${fieldType(ref2, f.name)}`);
                    } else if (f.type.ofType.kind === 'ENUM') {
                        segs.push(`${f.name}: /*${ref2} ${require('../../util/enums/' + ref2).values.join(', ')}*/ {type: DataTypes.STRING}`);
                    } else if (specs.docs.find(d => d.name === ref2)) {
                        segs.push(`${f.name}: [{type: DataTypes.INTEGER, references: {model: tableNameFn('${ref2}'), key: 'id'}}]`);
                    } else {
                        segs.push(`${f.name}: [${renderComplex(specs.sdocs.find(d => d.name === ref2).fields)}]`);
                    }
                    break;
                case 'ENUM':
                    segs.push(`${f.name}: /*${f.type.name}: ${require('../../util/enums/' + f.type.name).values.join(', ')}*/ {type: DataTypes.STRING}`);
                    break;
                case 'NON_NULL':

                    switch (f.type.ofType.kind) {
                        case 'SCALAR':
                            segs.push(`${f.name}: ${fieldType(f.type.ofType.name, f.name)}`);
                            break;
                        case 'OBJECT':
                            const ref = f.type.ofType.name;
                            if (specs.docs.find(d => d.name === ref)) {
                                segs.push(`${f.name}: {type: DataTypes.INTEGER, references: {model: tableNameFn('${ref}'), key: 'id'}}`);
                            } else {
                                segs.push(`${f.name}: ${renderComplex(specs.sdocs.find(d => d.name === ref).fields)}`);
                            }
                            break;
                        case 'LIST':
                            const ref2 = f.type.ofType.name;
                            if (f.type.ofType.kind === 'SCALAR') {
                                segs.push(`${f.name}: ${fieldType(ref2, f.name)}`);
                            } else if (f.type.ofType.kind === 'ENUM') {
                                segs.push(`${f.name}: /*${ref2}: ${require('../../util/enums/' + ref2).values.join(', ')}*/ {type: DataTypes.STRING}`);
                            } else if (specs.docs.find(d => d.name === ref2)) {
                                segs.push(`${f.name}: [{type: DataTypes.INTEGER, references: {model: tableNameFn('${ref2}'), key: 'id'}}]`);
                            } else {
                                segs.push(`${f.name}: [${renderComplex(specs.sdocs.find(d => d.name === ref2).fields)}]`);
                            }
                            break;
                        case 'ENUM':
                            segs.push(`${f.name}: /*${f.type.ofType.name}: ${require('../../util/enums/' + f.type.ofType.name).values.join(', ')}*/ {type: DataTypes.STRING}`);
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
