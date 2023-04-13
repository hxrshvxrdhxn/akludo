const {join} = require('path');
const fs = require('fs');
const selected = process.argv.slice(2);
exports = module.exports = function (specs) {


    [...(specs.docs)].forEach(e => {
        if(selected.length){
            if(selected.indexOf(e.name) === -1) return;
        }
        const path = join(__dirname, '../../interceptors', e.name + 'Interceptor.js');
        console.log(path);
        let content = `
/**
 * Interceptor for data manipulation for entity ${e.name}
 * */

class ${e.name}Interceptor {

    static async before${e.name}Create(ref${e.name}Dto, user) {
        // feel free to change the DTO for manipulation before save
    }

    static async before${e.name}Update(ref${e.name}UpdateDto, ref${e.name}OrigObj, user) {
        // feel free to change the Dto for manipulation before update
    }

    static async before${e.name}Delete(id, user) {
        // throw error here to stop deletion, or do actions necessary before deletion.
    }

    static async after${e.name}Find(id, found${e.name}, user) {
        // manipulate and return the object you want to return back in API.
        return found${e.name};
    }

    static async after${e.name}List(criteria, found${e.name}Items, limit, offset, total, user) {
        // manipulate and return the objects you want to return back in API.
        return found${e.name}Items;
    }

    static async before${e.name}List(refCriteriaObj, limit, offset, user) {
        // manipulate query refCriteriaObj as desired for listing. This is a mongoDB query.
    }

}

exports = module.exports = ${e.name}Interceptor;
`;

        fs.writeFileSync(path, content);

    });


};
