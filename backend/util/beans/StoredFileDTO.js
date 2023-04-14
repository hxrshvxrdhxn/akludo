const Bean = require('./Bean');

class StoredFileDTO extends Bean {

    constructor(...args) {
        super(...args);
        this._payload = args[0] || {};
        this._orig_storage = this._payload.storage;
        this._orig_uri = this._payload.uri;
        this._orig_name = this._payload.name;
        this._orig_mime = this._payload.mime;
        this._orig_size = this._payload.size;
        this._orig_sizeUnit = this._payload.sizeUnit;
    }

    get storage() {
        return this._payload.storage;
    }

    set storage(storage) {
        this._payload.storage = storage;
    }

    get uri() {
        return this._payload.uri;
    }

    set uri(uri) {
        this._payload.uri = uri;
    }

    get name() {
        return this._payload.name;
    }

    set name(name) {
        this._payload.name = name;
    }

    get mime() {
        return this._payload.mime;
    }

    set mime(mime) {
        this._payload.mime = mime;
    }

    get size() {
        return this._payload.size;
    }

    set size(size) {
        this._payload.size = size;
    }

    get sizeUnit() {
        return this._payload.sizeUnit;
    }

    set sizeUnit(sizeUnit) {
        this._payload.sizeUnit = sizeUnit;
    }

}

exports = module.exports = StoredFileDTO;

