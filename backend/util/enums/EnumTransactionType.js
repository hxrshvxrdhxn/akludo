/**
 * Enum EnumTransactionType
 * */
class EnumTransactionType {


    static get TRANSFER() {
        return 'TRANSFER'
    }

    static get TOP_UP() {
        return 'TOP_UP'
    }

    static get WITHDRAW() {
        return 'WITHDRAW'
    }

    static get HOLD() {
        return 'HOLD'
    }

    static get values() {
        return [this.TRANSFER, this.TOP_UP, this.WITHDRAW, this.HOLD];
    }

    static resolve(val) {
        return this[val];
    }
}

exports = module.exports = EnumTransactionType;

