/*
* Resolver for type StoredFile
*/

class StoredFileResolver {

    constructor(data, user) {
        if (!data) throw new Error('Data is required in resolver');
        this.data = data;
        this._user = user;
        // Inline imports to avoid cyclic dependency issue
    }

    async storage() {
        return this.data.storage;
    }


    async uri() {
        return this.data.uri;
    }


    async name() {
        return this.data.name;
    }


    async mime() {
        return this.data.mime;
    }


    async size() {
        return this.data.size;
    }


    async sizeUnit() {
        return this.data.sizeUnit;
    }


}

exports = module.exports = StoredFileResolver;

