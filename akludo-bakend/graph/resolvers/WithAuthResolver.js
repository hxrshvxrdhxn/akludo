const AuthResponseService = require('../../services/AuthResponseService');
const LanguageService = require('../../services/LanguageService');
const UserService = require('../../services/UserService');
const CountryService = require('../../services/CountryService');
const WalletService = require('../../services/WalletService');
const LedgerService = require('../../services/LedgerService');
const BankTransactionService = require('../../services/BankTransactionService');
const ChallengeService = require('../../services/ChallengeService');
const GameService = require('../../services/GameService');
const RoleService = require('../../services/RoleService');
const ResourceService = require('../../services/ResourceService');
const UpdateHistoryService = require('../../services/UpdateHistoryService');
const ConfigService = require('../../services/ConfigService');


/**
 * Resolve Name Node
 * */
class WithAuthResolver {
    constructor(user, token) {
        this._user = user;
        this.token = token;
        if (!this._user) throw new Error('GS: Invalid Auth Provided. Token not verified.');

        this.AuthResponseResolver = require('./AuthResponseResolver');
        this.LanguageResolver = require('./LanguageResolver');
        this.UserResolver = require('./UserResolver');
        this.CountryResolver = require('./CountryResolver');
        this.WalletResolver = require('./WalletResolver');
        this.LedgerResolver = require('./LedgerResolver');
        this.BankTransactionResolver = require('./BankTransactionResolver');
        this.ChallengeResolver = require('./ChallengeResolver');
        this.GameResolver = require('./GameResolver');
        this.RoleResolver = require('./RoleResolver');
        this.ResourceResolver = require('./ResourceResolver');
        this.UpdateHistoryResolver = require('./UpdateHistoryResolver');
        this.ConfigResolver = require('./ConfigResolver');
    }

    async _fullUser() {
        return await UserService.findOne(this._user.id || this._user._id, this._user);
    }

    _parseCriteria(criteria) {
        if (!criteria) return {};
        try {
            return JSON.parse(criteria);
        } catch (c) {
            throw new Error('Invalid Criteria. ' + c.message);
        }
    }

    async listAuthResponse({criteria, limit, offset}, {data}) {
        const listResp = await AuthResponseService.list(this._parseCriteria(criteria), limit, offset, await this._fullUser());
        //{docs, total, limit, offset}
        data[`listAuthResponseTotal`] = data.total = listResp.total;
        data[`listAuthResponseLimit`] = data.limit = listResp.limit;
        data[`listAuthResponseOffset`] = data.offset = listResp.offset;
        const user = await this._fullUser();
        return listResp.docs.map(doc => new this.AuthResponseResolver(doc, user));
    }

    async getAuthResponse({id}) {
        const user = await this._fullUser();
        const doc = await AuthResponseService.findOne(id, user);
        return doc ? new this.AuthResponseResolver(doc, user) : null;
    }


    async listLanguage({criteria, limit, offset}, {data}) {
        const listResp = await LanguageService.list(this._parseCriteria(criteria), limit, offset, await this._fullUser());
        //{docs, total, limit, offset}
        data[`listLanguageTotal`] = data.total = listResp.total;
        data[`listLanguageLimit`] = data.limit = listResp.limit;
        data[`listLanguageOffset`] = data.offset = listResp.offset;
        const user = await this._fullUser();
        return listResp.docs.map(doc => new this.LanguageResolver(doc, user));
    }

    async getLanguage({id}) {
        const user = await this._fullUser();
        const doc = await LanguageService.findOne(id, user);
        return doc ? new this.LanguageResolver(doc, user) : null;
    }


    async listUser({criteria, limit, offset}, {data}) {
        const listResp = await UserService.list(this._parseCriteria(criteria), limit, offset, await this._fullUser());
        //{docs, total, limit, offset}
        data[`listUserTotal`] = data.total = listResp.total;
        data[`listUserLimit`] = data.limit = listResp.limit;
        data[`listUserOffset`] = data.offset = listResp.offset;
        const user = await this._fullUser();
        return listResp.docs.map(doc => new this.UserResolver(doc, user));
    }

    async getUser({id}) {
        const user = await this._fullUser();
        const doc = await UserService.findOne(id, user);
        return doc ? new this.UserResolver(doc, user) : null;
    }


    async listCountry({criteria, limit, offset}, {data}) {
        const listResp = await CountryService.list(this._parseCriteria(criteria), limit, offset, await this._fullUser());
        //{docs, total, limit, offset}
        data[`listCountryTotal`] = data.total = listResp.total;
        data[`listCountryLimit`] = data.limit = listResp.limit;
        data[`listCountryOffset`] = data.offset = listResp.offset;
        const user = await this._fullUser();
        return listResp.docs.map(doc => new this.CountryResolver(doc, user));
    }

    async getCountry({id}) {
        const user = await this._fullUser();
        const doc = await CountryService.findOne(id, user);
        return doc ? new this.CountryResolver(doc, user) : null;
    }


    async listWallet({criteria, limit, offset}, {data}) {
        const listResp = await WalletService.list(this._parseCriteria(criteria), limit, offset, await this._fullUser());
        //{docs, total, limit, offset}
        data[`listWalletTotal`] = data.total = listResp.total;
        data[`listWalletLimit`] = data.limit = listResp.limit;
        data[`listWalletOffset`] = data.offset = listResp.offset;
        const user = await this._fullUser();
        return listResp.docs.map(doc => new this.WalletResolver(doc, user));
    }

    async getWallet({id}) {
        const user = await this._fullUser();
        const doc = await WalletService.findOne(id, user);
        return doc ? new this.WalletResolver(doc, user) : null;
    }


    async listLedger({criteria, limit, offset}, {data}) {
        const listResp = await LedgerService.list(this._parseCriteria(criteria), limit, offset, await this._fullUser());
        //{docs, total, limit, offset}
        data[`listLedgerTotal`] = data.total = listResp.total;
        data[`listLedgerLimit`] = data.limit = listResp.limit;
        data[`listLedgerOffset`] = data.offset = listResp.offset;
        const user = await this._fullUser();
        return listResp.docs.map(doc => new this.LedgerResolver(doc, user));
    }

    async getLedger({id}) {
        const user = await this._fullUser();
        const doc = await LedgerService.findOne(id, user);
        return doc ? new this.LedgerResolver(doc, user) : null;
    }


    async listBankTransaction({criteria, limit, offset}, {data}) {
        const listResp = await BankTransactionService.list(this._parseCriteria(criteria), limit, offset, await this._fullUser());
        //{docs, total, limit, offset}
        data[`listBankTransactionTotal`] = data.total = listResp.total;
        data[`listBankTransactionLimit`] = data.limit = listResp.limit;
        data[`listBankTransactionOffset`] = data.offset = listResp.offset;
        const user = await this._fullUser();
        return listResp.docs.map(doc => new this.BankTransactionResolver(doc, user));
    }

    async getBankTransaction({id}) {
        const user = await this._fullUser();
        const doc = await BankTransactionService.findOne(id, user);
        return doc ? new this.BankTransactionResolver(doc, user) : null;
    }


    async listChallenge({criteria, limit, offset}, {data}) {
        const listResp = await ChallengeService.list(this._parseCriteria(criteria), limit, offset, await this._fullUser());
        //{docs, total, limit, offset}
        data[`listChallengeTotal`] = data.total = listResp.total;
        data[`listChallengeLimit`] = data.limit = listResp.limit;
        data[`listChallengeOffset`] = data.offset = listResp.offset;
        const user = await this._fullUser();
        return listResp.docs.map(doc => new this.ChallengeResolver(doc, user));
    }

    async getChallenge({id}) {
        const user = await this._fullUser();
        const doc = await ChallengeService.findOne(id, user);
        return doc ? new this.ChallengeResolver(doc, user) : null;
    }


    async listGame({criteria, limit, offset}, {data}) {
        const listResp = await GameService.list(this._parseCriteria(criteria), limit, offset, await this._fullUser());
        //{docs, total, limit, offset}
        data[`listGameTotal`] = data.total = listResp.total;
        data[`listGameLimit`] = data.limit = listResp.limit;
        data[`listGameOffset`] = data.offset = listResp.offset;
        const user = await this._fullUser();
        return listResp.docs.map(doc => new this.GameResolver(doc, user));
    }

    async getGame({id}) {
        const user = await this._fullUser();
        const doc = await GameService.findOne(id, user);
        return doc ? new this.GameResolver(doc, user) : null;
    }


    async listRole({criteria, limit, offset}, {data}) {
        const listResp = await RoleService.list(this._parseCriteria(criteria), limit, offset, await this._fullUser());
        //{docs, total, limit, offset}
        data[`listRoleTotal`] = data.total = listResp.total;
        data[`listRoleLimit`] = data.limit = listResp.limit;
        data[`listRoleOffset`] = data.offset = listResp.offset;
        const user = await this._fullUser();
        return listResp.docs.map(doc => new this.RoleResolver(doc, user));
    }

    async getRole({id}) {
        const user = await this._fullUser();
        const doc = await RoleService.findOne(id, user);
        return doc ? new this.RoleResolver(doc, user) : null;
    }


    async listResource({criteria, limit, offset}, {data}) {
        const listResp = await ResourceService.list(this._parseCriteria(criteria), limit, offset, await this._fullUser());
        //{docs, total, limit, offset}
        data[`listResourceTotal`] = data.total = listResp.total;
        data[`listResourceLimit`] = data.limit = listResp.limit;
        data[`listResourceOffset`] = data.offset = listResp.offset;
        const user = await this._fullUser();
        return listResp.docs.map(doc => new this.ResourceResolver(doc, user));
    }

    async getResource({id}) {
        const user = await this._fullUser();
        const doc = await ResourceService.findOne(id, user);
        return doc ? new this.ResourceResolver(doc, user) : null;
    }


    async listUpdateHistory({criteria, limit, offset}, {data}) {
        const listResp = await UpdateHistoryService.list(this._parseCriteria(criteria), limit, offset, await this._fullUser());
        //{docs, total, limit, offset}
        data[`listUpdateHistoryTotal`] = data.total = listResp.total;
        data[`listUpdateHistoryLimit`] = data.limit = listResp.limit;
        data[`listUpdateHistoryOffset`] = data.offset = listResp.offset;
        const user = await this._fullUser();
        return listResp.docs.map(doc => new this.UpdateHistoryResolver(doc, user));
    }

    async getUpdateHistory({id}) {
        const user = await this._fullUser();
        const doc = await UpdateHistoryService.findOne(id, user);
        return doc ? new this.UpdateHistoryResolver(doc, user) : null;
    }


    async listConfig({criteria, limit, offset}, {data}) {
        const listResp = await ConfigService.list(this._parseCriteria(criteria), limit, offset, await this._fullUser());
        //{docs, total, limit, offset}
        data[`listConfigTotal`] = data.total = listResp.total;
        data[`listConfigLimit`] = data.limit = listResp.limit;
        data[`listConfigOffset`] = data.offset = listResp.offset;
        const user = await this._fullUser();
        return listResp.docs.map(doc => new this.ConfigResolver(doc, user));
    }

    async getConfig({id}) {
        const user = await this._fullUser();
        const doc = await ConfigService.findOne(id, user);
        return doc ? new this.ConfigResolver(doc, user) : null;
    }

}

// export
exports = module.exports = WithAuthResolver;
