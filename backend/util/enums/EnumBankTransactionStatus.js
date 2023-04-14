/**
 * Enum EnumBankTransactionStatus
 * */
class EnumBankTransactionStatus {


    static get SUCCESS() {
        return 'SUCCESS'
    }

    static get FAILED() {
        return 'FAILED'
    }

    static get PENDING() {
        return 'PENDING'
    }

    static get PROCESSING() {
        return 'PROCESSING'
    }

    static get values() {
        return [this.SUCCESS, this.FAILED, this.PENDING, this.PROCESSING];
    }

    static resolve(val) {
        return this[val];
    }
}

exports = module.exports = EnumBankTransactionStatus;

