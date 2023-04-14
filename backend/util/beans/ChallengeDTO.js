const Bean = require('./Bean');

class ChallengeDTO extends Bean {

    constructor(...args) {
        super(...args);
        this._payload = args[0] || {};
        this._orig_id = this._payload.id;
        this._orig_challenger = this._payload.challenger;
        this._orig_contender = this._payload.contender;
        this._orig_amount = this._payload.amount;
        this._orig_game = this._payload.game;
        this._orig_roomCode = this._payload.roomCode;
        this._orig_winner = this._payload.winner;
        this._orig_status = this._payload.status;
        this._orig_meta = this._payload.meta;
        this._orig_createdAt = this._payload.createdAt;
        this._orig_updatedAt = this._payload.updatedAt;
        this._orig_createdBy = this._payload.createdBy;
        this._orig_updatedBy = this._payload.updatedBy;
    }

    get id() {
        return this._payload.id;
    }

    set id(id) {
        this._payload.id = id;
    }

    get challenger() {
        return this._payload.challenger;
    }

    set challenger(challenger) {
        this._payload.challenger = challenger;
    }

    get contender() {
        return this._payload.contender;
    }

    set contender(contender) {
        this._payload.contender = contender;
    }

    get amount() {
        return this._payload.amount;
    }

    set amount(amount) {
        this._payload.amount = amount;
    }

    get game() {
        return this._payload.game;
    }

    set game(game) {
        this._payload.game = game;
    }

    get roomCode() {
        return this._payload.roomCode;
    }

    set roomCode(roomCode) {
        this._payload.roomCode = roomCode;
    }

    get winner() {
        return this._payload.winner;
    }

    set winner(winner) {
        this._payload.winner = winner;
    }

    get status() {
        return this._payload.status;
    }

    set status(status) {
        this._payload.status = status;
    }

    get meta() {
        return this._payload.meta;
    }

    set meta(meta) {
        this._payload.meta = meta;
    }

    get createdAt() {
        return this._payload.createdAt;
    }

    set createdAt(createdAt) {
        this._payload.createdAt = createdAt;
    }

    get updatedAt() {
        return this._payload.updatedAt;
    }

    set updatedAt(updatedAt) {
        this._payload.updatedAt = updatedAt;
    }

    get createdBy() {
        return this._payload.createdBy;
    }

    set createdBy(createdBy) {
        this._payload.createdBy = createdBy;
    }

    get updatedBy() {
        return this._payload.updatedBy;
    }

    set updatedBy(updatedBy) {
        this._payload.updatedBy = updatedBy;
    }

}

exports = module.exports = ChallengeDTO;

