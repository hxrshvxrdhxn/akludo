/**
 * Enum EnumAccessLevel
 * */
class EnumAccessLevel {


    static get NONE() {
        return 'NONE'
    }

    static get READ_ALL() {
        return 'READ_ALL'
    }

    static get CREATE() {
        return 'CREATE'
    }

    static get READ() {
        return 'READ'
    }

    static get READ_HIERARCHY() {
        return 'READ_HIERARCHY'
    }

    static get MODIFY() {
        return 'MODIFY'
    }

    static get DESTROY() {
        return 'DESTROY'
    }

    static get DESTROY_ALL() {
        return 'DESTROY_ALL'
    }

    static get values() {
        return [this.NONE, this.READ_ALL, this.CREATE, this.READ, this.READ_HIERARCHY, this.MODIFY, this.DESTROY, this.DESTROY_ALL];
    }

    static resolve(val) {
        return this[val];
    }
}

exports = module.exports = EnumAccessLevel;

