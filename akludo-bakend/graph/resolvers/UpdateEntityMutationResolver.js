// DTO
const AuthResponseDTO = require('../../util/beans/AuthResponseDTO');
const LanguageDTO = require('../../util/beans/LanguageDTO');
const UserDTO = require('../../util/beans/UserDTO');
const CountryDTO = require('../../util/beans/CountryDTO');
const WalletDTO = require('../../util/beans/WalletDTO');
const LedgerDTO = require('../../util/beans/LedgerDTO');
const BankTransactionDTO = require('../../util/beans/BankTransactionDTO');
const ChallengeDTO = require('../../util/beans/ChallengeDTO');
const GameDTO = require('../../util/beans/GameDTO');
const RoleDTO = require('../../util/beans/RoleDTO');
const ResourceDTO = require('../../util/beans/ResourceDTO');
const UpdateHistoryDTO = require('../../util/beans/UpdateHistoryDTO');
const ConfigDTO = require('../../util/beans/ConfigDTO');
// services
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
 * UpdateEntityMutationResolver
 * */
class UpdateEntityMutationResolver {
    constructor(user, token) {
        this._user = user;
        this.token = token;
        if (!this._user) throw new Error('Invalid Auth Provided');
        // resolvers
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


    async updateAuthResponse({success, token, id}, {data}) {
        const dto = new AuthResponseDTO({success, token});
        const result = await AuthResponseService.update(id, dto, this._user); //{updateResult, updatedDbObj}
        if (result && result.updateResult) {
            data.updateResult = result.updateResult;
            data.updateResult_AuthResponse = result.updateResult;
            return new this.AuthResponseResolver(result.updatedDbObj, this._user);
        } else throw new Error('Unable to update');
    }



    async updateLanguage({id, locale, name, createdAt, updatedAt, createdBy, updatedBy}, {data}) {
        const dto = new LanguageDTO({locale, name, createdAt, updatedAt, createdBy, updatedBy});
        const result = await LanguageService.update(id, dto, this._user); //{updateResult, updatedDbObj}
        if (result && result.updateResult) {
            data.updateResult = result.updateResult;
            data.updateResult_Language = result.updateResult;
            return new this.LanguageResolver(result.updatedDbObj, this._user);
        } else throw new Error('Unable to update');
    }



    async updateUser({id, name, gender, emails, phones, naiveAuthPass, status, options, picture, socialProfiles, wallet, defaultRole, createdAt, updatedAt, createdBy, updatedBy}, {data}) {
        const dto = new UserDTO({name, gender, emails, phones, naiveAuthPass, status, options, picture, socialProfiles, wallet, defaultRole, createdAt, updatedAt, createdBy, updatedBy});
        const result = await UserService.update(id, dto, this._user); //{updateResult, updatedDbObj}
        if (result && result.updateResult) {
            data.updateResult = result.updateResult;
            data.updateResult_User = result.updateResult;
            return new this.UserResolver(result.updatedDbObj, this._user);
        } else throw new Error('Unable to update');
    }



    async updateCountry({id, name, code, createdAt, updatedAt, createdBy, updatedBy}, {data}) {
        const dto = new CountryDTO({name, code, createdAt, updatedAt, createdBy, updatedBy});
        const result = await CountryService.update(id, dto, this._user); //{updateResult, updatedDbObj}
        if (result && result.updateResult) {
            data.updateResult = result.updateResult;
            data.updateResult_Country = result.updateResult;
            return new this.CountryResolver(result.updatedDbObj, this._user);
        } else throw new Error('Unable to update');
    }



    async updateWallet({id, user, bal, ledger, createdAt, updatedAt, createdBy, updatedBy}, {data}) {
        const dto = new WalletDTO({user, bal, ledger, createdAt, updatedAt, createdBy, updatedBy});
        const result = await WalletService.update(id, dto, this._user); //{updateResult, updatedDbObj}
        if (result && result.updateResult) {
            data.updateResult = result.updateResult;
            data.updateResult_Wallet = result.updateResult;
            return new this.WalletResolver(result.updatedDbObj, this._user);
        } else throw new Error('Unable to update');
    }



    async updateLedger({id, fromUser, toUser, amount, txType, linkedBankTransaction, linkedChallenge, createdAt, updatedAt, createdBy, updatedBy}, {data}) {
        const dto = new LedgerDTO({fromUser, toUser, amount, txType, linkedBankTransaction, linkedChallenge, createdAt, updatedAt, createdBy, updatedBy});
        const result = await LedgerService.update(id, dto, this._user); //{updateResult, updatedDbObj}
        if (result && result.updateResult) {
            data.updateResult = result.updateResult;
            data.updateResult_Ledger = result.updateResult;
            return new this.LedgerResolver(result.updatedDbObj, this._user);
        } else throw new Error('Unable to update');
    }



    async updateBankTransaction({id, status, gateway, gatewayMethod, amount, txType, meta, createdAt, updatedAt, createdBy, updatedBy}, {data}) {
        const dto = new BankTransactionDTO({status, gateway, gatewayMethod, amount, txType, meta, createdAt, updatedAt, createdBy, updatedBy});
        const result = await BankTransactionService.update(id, dto, this._user); //{updateResult, updatedDbObj}
        if (result && result.updateResult) {
            data.updateResult = result.updateResult;
            data.updateResult_BankTransaction = result.updateResult;
            return new this.BankTransactionResolver(result.updatedDbObj, this._user);
        } else throw new Error('Unable to update');
    }



    async updateChallenge({id, challenger, contender, amount, game, roomCode, winner, status, meta, createdAt, updatedAt, createdBy, updatedBy}, {data}) {
        const dto = new ChallengeDTO({challenger, contender, amount, game, roomCode, winner, status, meta, createdAt, updatedAt, createdBy, updatedBy});
        const result = await ChallengeService.update(id, dto, this._user); //{updateResult, updatedDbObj}
        if (result && result.updateResult) {
            data.updateResult = result.updateResult;
            data.updateResult_Challenge = result.updateResult;
            return new this.ChallengeResolver(result.updatedDbObj, this._user);
        } else throw new Error('Unable to update');
    }



    async updateGame({id, name, image, status, description, urn, createdAt, updatedAt, createdBy, updatedBy}, {data}) {
        const dto = new GameDTO({name, image, status, description, urn, createdAt, updatedAt, createdBy, updatedBy});
        const result = await GameService.update(id, dto, this._user); //{updateResult, updatedDbObj}
        if (result && result.updateResult) {
            data.updateResult = result.updateResult;
            data.updateResult_Game = result.updateResult;
            return new this.GameResolver(result.updatedDbObj, this._user);
        } else throw new Error('Unable to update');
    }



    async updateRole({id, name, parent, inherit, permissions, restrictions, userPermissions, createdAt, updatedAt, createdBy, updatedBy}, {data}) {
        const dto = new RoleDTO({name, parent, inherit, permissions, restrictions, userPermissions, createdAt, updatedAt, createdBy, updatedBy});
        const result = await RoleService.update(id, dto, this._user); //{updateResult, updatedDbObj}
        if (result && result.updateResult) {
            data.updateResult = result.updateResult;
            data.updateResult_Role = result.updateResult;
            return new this.RoleResolver(result.updatedDbObj, this._user);
        } else throw new Error('Unable to update');
    }



    async updateResource({id, description, urn, createdAt, updatedAt, createdBy, updatedBy}, {data}) {
        const dto = new ResourceDTO({description, urn, createdAt, updatedAt, createdBy, updatedBy});
        const result = await ResourceService.update(id, dto, this._user); //{updateResult, updatedDbObj}
        if (result && result.updateResult) {
            data.updateResult = result.updateResult;
            data.updateResult_Resource = result.updateResult;
            return new this.ResourceResolver(result.updatedDbObj, this._user);
        } else throw new Error('Unable to update');
    }



    async updateUpdateHistory({id, model, changelog, createdAt, updatedAt, createdBy, updatedBy}, {data}) {
        const dto = new UpdateHistoryDTO({model, changelog, createdAt, updatedAt, createdBy, updatedBy});
        const result = await UpdateHistoryService.update(id, dto, this._user); //{updateResult, updatedDbObj}
        if (result && result.updateResult) {
            data.updateResult = result.updateResult;
            data.updateResult_UpdateHistory = result.updateResult;
            return new this.UpdateHistoryResolver(result.updatedDbObj, this._user);
        } else throw new Error('Unable to update');
    }



    async updateConfig({id, name, configType, value, selectOptions, createdAt, updatedAt, createdBy, updatedBy}, {data}) {
        const dto = new ConfigDTO({name, configType, value, selectOptions, createdAt, updatedAt, createdBy, updatedBy});
        const result = await ConfigService.update(id, dto, this._user); //{updateResult, updatedDbObj}
        if (result && result.updateResult) {
            data.updateResult = result.updateResult;
            data.updateResult_Config = result.updateResult;
            return new this.ConfigResolver(result.updatedDbObj, this._user);
        } else throw new Error('Unable to update');
    }
}

// export
exports = module.exports = UpdateEntityMutationResolver;
