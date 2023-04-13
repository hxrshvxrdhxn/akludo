/*
* Resolver for type SocialProfile
*/

class SocialProfileResolver {

    constructor(data, user) {
        if (!data) throw new Error('Data is required in resolver');
        this.data = data;
        this._user = user;
        // Inline imports to avoid cyclic dependency issue
    }

    async platform() {
        return this.data.platform;
    }


    async oauth() {
        return this.data.oauth;
    }


    async profileId() {
        return this.data.profileId;
    }


    async handle() {
        return this.data.handle;
    }


    async url() {
        return this.data.url;
    }


    async token() {
        return this.data.token;
    }


    async refreshToken() {
        return this.data.refreshToken;
    }


}

exports = module.exports = SocialProfileResolver;

