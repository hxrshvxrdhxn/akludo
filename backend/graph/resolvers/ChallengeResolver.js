const UserService = require('../../services/UserService');
const GameService = require('../../services/GameService');

/*
* Resolver for type Challenge
*/

class ChallengeResolver {

    constructor(data, user) {
        if (!data) throw new Error('Data is required in resolver');
        this.data = data;
        this._user = user;
        // Inline imports to avoid cyclic dependency issue
        this.UserResolver = require('./UserResolver');
        this.GameResolver = require('./GameResolver');
    }

    async id() {
        return this.data._id;
    }


    async challenger() {
        const found = await UserService.findOne(this.data.challenger, this._user);
        return found ? new this.UserResolver(found, this._user) : null;
    }


    async contender() {
        const found = await UserService.findOne(this.data.contender, this._user);
        return found ? new this.UserResolver(found, this._user) : null;
    }


    async amount() {
        return this.data.amount;
    }


    async game() {
        const found = await GameService.findOne(this.data.game, this._user);
        return found ? new this.GameResolver(found, this._user) : null;
    }


    async roomCode() {
        return this.data.roomCode;
    }


    async winner() {
        const found = await UserService.findOne(this.data.winner, this._user);
        return found ? new this.UserResolver(found, this._user) : null;
    }


    async status() {
        return this.data.status;
    }


    async meta() {
        return this.data.meta;
    }


    async createdAt() {
        return this.data.createdAt.toString();
    }


    async updatedAt() {
        return this.data.updatedAt.toString();
    }


    async createdBy() {
        const found = await UserService.findOne(this.data.createdBy, this._user);
        return found ? new this.UserResolver(found, this._user) : null;
    }


    async updatedBy() {
        const found = await UserService.findOne(this.data.updatedBy, this._user);
        return found ? new this.UserResolver(found, this._user) : null;
    }


}

exports = module.exports = ChallengeResolver;

