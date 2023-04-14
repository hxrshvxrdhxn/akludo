/*
* Resolver for type PhoneNumber
*/

class PhoneNumberResolver {

    constructor(data, user) {
        if (!data) throw new Error('Data is required in resolver');
        this.data = data;
        this._user = user;
        // Inline imports to avoid cyclic dependency issue
    }

    async number() {
        return this.data.number;
    }


    async countryCode() {
        return this.data.countryCode;
    }


    async isVerified() {
        return this.data.isVerified;
    }


    async isPrimary() {
        return this.data.isPrimary;
    }


    async addedAtDate() {
        return this.data.addedAtDate;
    }


    async verifiedAtDate() {
        return this.data.verifiedAtDate;
    }


    async madePrimaryAtDate() {
        return this.data.madePrimaryAtDate;
    }


}

exports = module.exports = PhoneNumberResolver;

