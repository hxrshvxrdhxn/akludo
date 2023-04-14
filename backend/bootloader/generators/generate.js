const {join} = require('path');
const fs = require('fs');
// const schema = require('./schema');
const {buildSchema, introspectionFromSchema} = require('graphql');

const schema = {data: introspectionFromSchema(buildSchema(fs.readFileSync(join(__dirname, '../../', 'graph', 'schema.graphql')).toString()))};
// fs.writeFileSync('./tt.json',JSON.stringify(schema))
// split in enum, scalar, docs and subdocs
const enums = [], docs = [], sdocs = [], scalars = [];

schema.data.__schema.types.forEach(t => {
    if (t.name.search(/^__/) > -1) return;
    if (t.name.search(/WithAuth/) > -1) return;
    if (t.name.search(/Mutation/) > -1) return;
    if (t.name.search(/^Query/) > -1) return;
    if (t.name.search(/^HealthCheck$/) > -1) return;
    // const selected = process.argv.slice(2);
    // if(selected.length){
    //     if(selected.indexOf(t.name) === -1) return;
    // }
    switch (t.kind) {
        case 'SCALAR':
            scalars.push(t);
            break;
        case 'OBJECT':
            if (t.fields.find(f => f.name === 'id')) docs.push(t);
            else sdocs.push(t);
            break;
        case 'ENUM':
            enums.push(t);
            break;
    }
});

const printType = (l, lb) => {
    console.log(`---------------${lb || ''}-${l.length}--------------`);
    l.forEach(t => console.log(t.name));
    console.log('------------------------------');
};

console.log({
    e: enums.length,
    d: docs.length,
    s: sdocs.length,
    sc: scalars.length,
});

printType(enums, 'Enums');
printType(scalars, 'Scalars');
printType(docs, 'Docs');
printType(sdocs, 'Sub Docs');

const specs = {enums, docs, sdocs, scalars};

// make enums
// require('./generateEnums')(specs);
// make models
// require('./generateModels')(specs);
// require('./generateModelsKeystone')(specs);
// make validators
// require('./generateValidators')(specs);
// make beans
// require('./generateBeans')(specs);
// make services
// require('./generateServices')(specs);
// require('./generateHooks')(specs);
// require('./generateInterceptors')(specs);
// make interface resolver
// require('./generateResolvers')(specs);
// make get / list query
// require('./generateGetQ')(specs);
// make create query
// require('./generateCQ')(specs);
require('./generateUQ')(specs);

// todo add in permissions json

// todo make update query
// todo make delete query


