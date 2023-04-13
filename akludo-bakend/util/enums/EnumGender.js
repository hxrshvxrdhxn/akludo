/**
 * Enum EnumGender
 * */
class EnumGender {


    static get MALE() {
        return 'MALE'
    }

    static get FEMALE() {
        return 'FEMALE'
    }

    static get OTHER() {
        return 'OTHER'
    }

    static get values() {
        return [this.MALE, this.FEMALE, this.OTHER];
    }

    static resolve(val) {
        return this[val];
    }
}

exports = module.exports = EnumGender;

