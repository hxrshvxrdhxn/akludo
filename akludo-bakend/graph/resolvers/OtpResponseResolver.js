/*
* Resolver for type OtpResponse
*/

class OtpResponseResolver {

    constructor(data, user) {
        if (!data) throw new Error('Data is required in resolver');
        this.data = data;
        this._user = user;
        // Inline imports to avoid cyclic dependency issue
    }

    async ctx() {
        return this.data.ctx;
    }


    async success() {
        return this.data.success;
    }


}

exports = module.exports = OtpResponseResolver;

