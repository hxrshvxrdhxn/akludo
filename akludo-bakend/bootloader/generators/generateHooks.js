const {join} = require('path');
const fs = require('fs');
const selected = process.argv.slice(2);
exports = module.exports = function (specs) {


    [...(specs.docs)].forEach(e => {
        if(selected.length){
            if(selected.indexOf(e.name) === -1) return;
        }
        const path = join(__dirname, '../../hooks', e.name + 'Hook.js');
        console.log(path);
        let content = `
const Hook = require('./base/Hook');

/**
 * Hook to run lifecycle events for entity ${e.name}
 * */

class ${e.name}Hook extends Hook {

    onEvent({event, data}) {
        console.log('Triggered hook', this.constructor.name, event, data);
        this[event](data);
    }
    
    on${e.name}Create(newObj){
        // called when ${e.name} is created.
    }
    
    on${e.name}Update({oldObj, newObj}){
        // called when ${e.name} is updated.
    }
    
    on${e.name}Delete(id){
        // called when ${e.name} is deleted.
    }

}

exports = module.exports = ${e.name}Hook;
`;

        fs.writeFileSync(path, content);

    });


};
