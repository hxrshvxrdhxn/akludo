// DTO
const AuthResponseDTO = require('../../util/beans/AuthResponseDTO');
const LanguageDTO = require('../../util/beans/LanguageDTO');
const UserDTO = require('../../util/beans/UserDTO');
const CountryDTO = require('../../util/beans/CountryDTO');
const WalletDTO = require('../../util/beans/WalletDTO');
const LedgerDTO = require('../../util/beans/LedgerDTO');
const ReferralDTO = require('../../util/beans/ReferralDTO');
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
const ReferralService = require('../../services/ReferralService');
const BankTransactionService = require('../../services/BankTransactionService');
const ChallengeService = require('../../services/ChallengeService');
const GameService = require('../../services/GameService');
const RoleService = require('../../services/RoleService');
const ResourceService = require('../../services/ResourceService');
const UpdateHistoryService = require('../../services/UpdateHistoryService');
const ConfigService = require('../../services/ConfigService');
const WithdrawalRequestDTO = require('../../util/beans/WithdrawalRequestDTO');
const WithdrawalRequestService = require('../../services/WithdrawalRequestService');

/**
 * Resolve Name Node
 * */
class FabricateEntityMutationResolver {
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
        this.ReferralResolver=require('./ReferralResolver');
        this.BankTransactionResolver = require('./BankTransactionResolver');
        this.ChallengeResolver = require('./ChallengeResolver');
        this.GameResolver = require('./GameResolver');
        this.RoleResolver = require('./RoleResolver');
        this.ResourceResolver = require('./ResourceResolver');
        this.UpdateHistoryResolver = require('./UpdateHistoryResolver');
        this.ConfigResolver = require('./ConfigResolver');
        this.WithdrawalRequestResolver = require('./WithdrawalRequestResolver');
    }

    async createAuthResponse({success, token}) {
        const dto = new AuthResponseDTO({success, token});
        const doc = await AuthResponseService.create(dto, this._user);
        return doc ? new this.AuthResponseResolver(doc, this._user) : null;
    }


    async createLanguage({locale, name, createdAt, updatedAt, createdBy, updatedBy}) {
        const dto = new LanguageDTO({locale, name, createdAt, updatedAt, createdBy, updatedBy});
        const doc = await LanguageService.create(dto, this._user);
        return doc ? new this.LanguageResolver(doc, this._user) : null;
    }


    async createUser({
                         name,
                         gender,
                         emails,
                         phones,
                         naiveAuthPass,
                         status,
                         options,
                         picture,
                         socialProfiles,
                         wallet,
                         kyc,
                         referral,
                         defaultRole,
                         createdAt,
                         updatedAt,
                         createdBy,
                         updatedBy
                     }) {
        const dto = new UserDTO({
            name,
            gender,
            emails,
            phones,
            naiveAuthPass,
            status,
            options,
            picture,
            socialProfiles,
            wallet,
            kyc,
            referral,
            defaultRole,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy
        });
        const doc = await UserService.create(dto, this._user);
        return doc ? new this.UserResolver(doc, this._user) : null;
    }


    async createCountry({name, code, createdAt, updatedAt, createdBy, updatedBy}) {
        const dto = new CountryDTO({name, code, createdAt, updatedAt, createdBy, updatedBy});
        const doc = await CountryService.create(dto, this._user);
        return doc ? new this.CountryResolver(doc, this._user) : null;
    }


    async createWallet({user, bal, earning, ledger, status, createdAt, updatedAt, createdBy, updatedBy}) {
        const dto = new WalletDTO({user, bal, earning, ledger, status, createdAt, updatedAt, createdBy, updatedBy});
        const doc = await WalletService.create(dto, this._user);
        return doc ? new this.WalletResolver(doc, this._user) : null;
    }


    async createLedger({
                           fromUser,
                           toUser,
                           amount,
                           txType,
                           linkedBankTransaction,
                           linkedChallenge,
                           createdAt,
                           updatedAt,
                           createdBy,
                           updatedBy
                       }) {
        const dto = new LedgerDTO({
            fromUser,
            toUser,
            amount,
            txType,
            linkedBankTransaction,
            linkedChallenge,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy
        });
        const doc = await LedgerService.create(dto, this._user);
        return doc ? new this.LedgerResolver(doc, this._user) : null;
    }


    async createBankTransaction({
                                    status,
                                    gateway,
                                    gatewayMethod,
                                    amount,
                                    txType,
                                    meta,
                                    createdAt,
                                    updatedAt,
                                    createdBy,
                                    updatedBy
                                }) {
        const dto = new BankTransactionDTO({
            status,
            gateway,
            gatewayMethod,
            amount,
            txType,
            meta,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy
        });
        console.log("this is Dto for create bt", dto);    
        const doc = await BankTransactionService.create(dto, this._user);
        return doc ? new this.BankTransactionResolver(doc, this._user) : null;
    }


    async createChallenge({
                              challenger,
                              contender,
                              amount,
                              game,
                              roomCode,
                              winner,
                              status,
                              meta,
                              createdAt,
                              updatedAt,
                              createdBy,
                              updatedBy
                          }) {
        const dto = new ChallengeDTO({
            challenger,
            contender,
            amount,
            game,
            roomCode,
            winner,
            status,
            meta,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy
        });
        const doc = await ChallengeService.create(dto, this._user);
        return doc ? new this.ChallengeResolver(doc, this._user) : null;
    }


    async createGame({name, image, status, description, urn, createdAt, updatedAt, createdBy, updatedBy}) {
        const dto = new GameDTO({name, image, status, description, urn, createdAt, updatedAt, createdBy, updatedBy});
        const doc = await GameService.create(dto, this._user);
        return doc ? new this.GameResolver(doc, this._user) : null;
    }

    async createWithdrawalRequest({user, status, amount, ledger, bankTransaction, rejectReason, createdAt, updatedAt, createdBy, updatedBy}) {
        const dto = new WithdrawalRequestDTO({user, status, amount, ledger, bankTransaction, rejectReason, createdAt, updatedAt, createdBy, updatedBy});
        //console.log("this is dto",dto)
        const doc = await WithdrawalRequestService.create(dto, this._user);
        return doc ? new this.GameResolver(doc, this._user) : null;
    }

    async createRole({
                         name,
                         parent,
                         inherit,
                         permissions,
                         restrictions,
                         userPermissions,
                         createdAt,
                         updatedAt,
                         createdBy,
                         updatedBy
                     }) {
        const dto = new RoleDTO({
            name,
            parent,
            inherit,
            permissions,
            restrictions,
            userPermissions,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy
        });
        const doc = await RoleService.create(dto, this._user);
        return doc ? new this.RoleResolver(doc, this._user) : null;
    }


    async createResource({description, urn, createdAt, updatedAt, createdBy, updatedBy}) {
        const dto = new ResourceDTO({description, urn, createdAt, updatedAt, createdBy, updatedBy});
        const doc = await ResourceService.create(dto, this._user);
        return doc ? new this.ResourceResolver(doc, this._user) : null;
    }


    async createUpdateHistory({model, changelog, createdAt, updatedAt, createdBy, updatedBy}) {
        const dto = new UpdateHistoryDTO({model, changelog, createdAt, updatedAt, createdBy, updatedBy});
        const doc = await UpdateHistoryService.create(dto, this._user);
        return doc ? new this.UpdateHistoryResolver(doc, this._user) : null;
    }


    async createConfig({name, configType, value, selectOptions, createdAt, updatedAt, createdBy, updatedBy}) {
        const dto = new ConfigDTO({name, configType, value, selectOptions, createdAt, updatedAt, createdBy, updatedBy});
        const doc = await ConfigService.create(dto, this._user);
        return doc ? new this.ConfigResolver(doc, this._user) : null;
    }

}

// export
exports = module.exports = FabricateEntityMutationResolver;
