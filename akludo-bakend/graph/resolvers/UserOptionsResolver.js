const CountryService = require('../../services/CountryService');
const LanguageService = require('../../services/LanguageService');

/*
* Resolver for type UserOptions
*/

class UserOptionsResolver {

    constructor(data, user) {
        if (!data) throw new Error('Data is required in resolver');
        this.data = data;
        this._user = user;
        // Inline imports to avoid cyclic dependency issue
        this.CountryResolver = require('./CountryResolver');
        this.LanguageResolver = require('./LanguageResolver');
    }

    async sendNotifications() {
        return this.data.sendNotifications;
    }


    async country() {
        const found = await CountryService.findOne(this.data.country, this._user);
        return found ? new this.CountryResolver(found, this._user) : null;
    }


    async defaultLanguage() {
        const found = await LanguageService.findOne(this.data.defaultLanguage, this._user);
        return found ? new this.LanguageResolver(found, this._user) : null;
    }


}

exports = module.exports = UserOptionsResolver;

