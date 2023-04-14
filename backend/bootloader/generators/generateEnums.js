const {join} = require('path');
const fs = require('fs');
const selected = process.argv.slice(2);

exports = module.exports = function (specs) {
    specs.enums.forEach(e => {
        if(selected.length){
            if(selected.indexOf(e.name) === -1) return;
        }
        const path = join(__dirname, '../../util/enums', e.name + '.js');
        console.log(path);
        let content = `
/**
 * Enum ${e.name}
 * */
class ${e.name} {
${
            e.enumValues.reduce((p, c) => {
                p += `

    static get ${c.name}() {
        return '${c.name}'
    }`;
                return p;
            }, '')
            }

    static get values(){
        return [${e.enumValues.map(v => 'this.' + v.name).join(', ')}];
    }
    static resolve(val) {
        return this[val];
    }
}

exports = module.exports = ${e.name};

    `;

        fs.writeFileSync(path, content);
    });
};
