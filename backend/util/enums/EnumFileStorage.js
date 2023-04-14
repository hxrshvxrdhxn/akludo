/**
 * Enum EnumFileStorage
 * */
class EnumFileStorage {


    static get S3() {
        return 'S3'
    }

    static get LOCAL() {
        return 'LOCAL'
    }

    static get REMOTE_URL() {
        return 'REMOTE_URL'
    }

    static get values() {
        return [this.S3, this.LOCAL, this.REMOTE_URL];
    }

    static resolve(val) {
        return this[val];
    }
}

exports = module.exports = EnumFileStorage;

