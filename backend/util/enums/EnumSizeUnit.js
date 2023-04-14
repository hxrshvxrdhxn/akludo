/**
 * Enum EnumSizeUnit
 * */
class EnumSizeUnit {


    static get B() {
        return 'B'
    }

    static get KB() {
        return 'KB'
    }

    static get MB() {
        return 'MB'
    }

    static get GB() {
        return 'GB'
    }

    static get TB() {
        return 'TB'
    }

    static get values() {
        return [this.B, this.KB, this.MB, this.GB, this.TB];
    }

    static resolve(val) {
        return this[val];
    }
}

exports = module.exports = EnumSizeUnit;

