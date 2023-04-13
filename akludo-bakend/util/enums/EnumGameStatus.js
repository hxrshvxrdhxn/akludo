/**
 * Enum EnumGameStatus
 * */
class EnumGameStatus {


    static get AVAILABLE() {
        return 'AVAILABLE'
    }

    static get DISABLED() {
        return 'DISABLED'
    }

    static get DEPRECATED() {
        return 'DEPRECATED'
    }

    static get values() {
        return [this.AVAILABLE, this.DISABLED, this.DEPRECATED];
    }

    static resolve(val) {
        return this[val];
    }
}

exports = module.exports = EnumGameStatus;

