const Validator = require('./Validator');

class ChallengeValidator extends Validator {

    constructor(...args) {
        super(...args);
    }

    id(id) {
        return false; // return string containing error message to define error, else send any false value.
    }


    challenger(challenger) {
        if (challenger) {
            return _db.Challenge.convertToObjectId(challenger) ? false : 'Invalid ID passed for Challenge->challenger. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    contender(contender) {
        if (contender) {
            return _db.Challenge.convertToObjectId(contender) ? false : 'Invalid ID passed for Challenge->contender. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    amount(amount) {
        return false; // return string containing error message to define error, else send any false value.
    }


    game(game) {
        if (game) {
            return _db.Challenge.convertToObjectId(game) ? false : 'Invalid ID passed for Challenge->game. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    roomCode(roomCode) {
        return false; // return string containing error message to define error, else send any false value.
    }


    winner(winner) {
        if (winner) {
            return _db.Challenge.convertToObjectId(winner) ? false : 'Invalid ID passed for Challenge->winner. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    status(status) {
        return false; // return string containing error message to define error, else send any false value.
    }


    meta(meta) {
        return false; // return string containing error message to define error, else send any false value.
    }


    createdAt(createdAt) {
        return false; // return string containing error message to define error, else send any false value.
    }


    updatedAt(updatedAt) {
        return false; // return string containing error message to define error, else send any false value.
    }


    createdBy(createdBy) {
        if (createdBy) {
            return _db.Challenge.convertToObjectId(createdBy) ? false : 'Invalid ID passed for Challenge->createdBy. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


    updatedBy(updatedBy) {
        if (updatedBy) {
            return _db.Challenge.convertToObjectId(updatedBy) ? false : 'Invalid ID passed for Challenge->updatedBy. Please pass a valid Object id.';
        } else {
            return false;
        }
    }


}

exports = module.exports = ChallengeValidator;

