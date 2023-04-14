/*
* Resolver for type AuthResponse
*/

class AuthResponseResolver {

    constructor(data, user) {
        if (!data) throw new Error('Data is required in resolver');
        this.data = data;
        this._user = user;
        // Inline imports to avoid cyclic dependency issue
    }

    async success() {
        return this.data.success;
    }


    async token() {
        return this.data.token;
    }


    async id() {
        return this.data._id;
    }


}

exports = module.exports = AuthResponseResolver;

