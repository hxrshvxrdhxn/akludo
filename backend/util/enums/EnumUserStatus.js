/**
 * Enum EnumUserStatus
 * */
class EnumUserStatus {


    static get ENABLED() {
        return 'ENABLED'
    }

    static get DISABLED() {
        return 'DISABLED'
    }

    static get PSEUDO() {
        return 'PSEUDO'
    }

    static get values() {
        return [this.ENABLED, this.DISABLED, this.PSEUDO];
    }

    static resolve(val) {
        return this[val];
    }
}

exports = module.exports = EnumUserStatus;

