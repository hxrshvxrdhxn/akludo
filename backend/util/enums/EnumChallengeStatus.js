/**
 * Enum EnumChallengeStatus
 * */
class EnumChallengeStatus {


    static get PENDING() {
        return 'PENDING'
    }

    static get CREATED() {
        return 'CREATED'
    }

    static get STARTED() {
        return 'STARTED'
    }

    static get COMPLETE() {
        return 'COMPLETE'
    }

    static get CANCELLED() {
        return 'CANCELLED'
    }

    static get values() {
        return [this.PENDING, this.CREATED, this.STARTED, this.COMPLETE, this.CANCELLED];
    }

    static resolve(val) {
        return this[val];
    }
}

exports = module.exports = EnumChallengeStatus;

