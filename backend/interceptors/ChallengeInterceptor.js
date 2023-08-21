const EnumTransactionType = require('../util/enums/EnumTransactionType');
const RoomCodeService = require('../services/RoomCodeService');

/**
 * Interceptor for data manipulation for entity Challenge
 * */

class ChallengeInterceptor {

    static async beforeChallengeCreate(refChallengeDto, user) {
        // feel free to change the DTO for manipulation before save
        // check balance
        const wallet = await _db.Wallet.findOne({user: refChallengeDto.challenger});
        if (!wallet) throw new Error('Invalid user configuration.Create a new account or contact admin.');
        if (wallet.bal < refChallengeDto.amount) throw new Error('Low Balance. Please add funds');
        // deduct balance
        wallet.bal = wallet.bal - refChallengeDto.amount;
        if (wallet.earning && wallet?.bal - wallet?.earning <= 0) {
            wallet.earning = wallet?.earning + wallet?.bal - wallet?.earning;
        }
        await wallet.save();
        // create transaction
        const ledgerEntry = new _db.Ledger({
            fromUser: refChallengeDto.challenger,
            amount: refChallengeDto.amount,
            txType: EnumTransactionType.HOLD
        });
        await ledgerEntry.save();
        //
        refChallengeDto.meta = ledgerEntry._id;
    }

    static async beforeChallengeUpdate(refChallengeUpdateDto, refChallengeOrigObj, user) {
        // feel free to change the Dto for manipulation before update
    }

    static async beforeChallengeDelete(id, user) {
        // throw error here to stop deletion, or do actions necessary before deletion.
    }

    static async afterChallengeFind(id, foundChallenge, user) {
        // manipulate and return the object you want to return back in API.
        return foundChallenge;
    }

    static async afterChallengeCreate(id, createdChallenge, user) {
        // manipulate and return the object you want to return back in API.
        // generate the room code and save in the object.
        if (!createdChallenge.roomCode) {
            createdChallenge.roomCode = await RoomCodeService.generateRoomCode();
            await _db.Challenge.update({_id: createdChallenge._id || id}, {$set: {roomCode: createdChallenge.roomCode}});
        }
        return createdChallenge;
    }

    static async afterChallengeList(criteria, foundChallengeItems, limit, offset, total, user) {
        // manipulate and return the objects you want to return back in API.
        return foundChallengeItems;
    }

    static async beforeChallengeList(refCriteriaObj, limit, offset, user) {
        // manipulate query refCriteriaObj as desired for listing. This is a mongoDB query.
    }

}

exports = module.exports = ChallengeInterceptor;
