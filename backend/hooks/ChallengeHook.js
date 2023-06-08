const Hook = require('./base/Hook');
const MainSocketController = require('../sockets/MainSocketController');
const { getCurrentUser } = require('../services/paymentgateway/TransactionService');
const UserService = require('../services/UserService');
const WalletService = require('../services/WalletService');
const WalletDTO = require('../util/beans/WalletDTO');
const LedgerDTO = require('../util/beans/LedgerDTO');
const LedgerService = require('../services/LedgerService');
const ChallengeDTO = require('../util/beans/ChallengeDTO');

/**
 * Hook to run lifecycle events for entity Challenge
 * */


class ChallengeHook extends Hook {

    onEvent({event, data}) {
        console.log('Triggered hook', this.constructor.name, event, data);
        this[event](data);
    }

    async onChallengeCreate(newObj) {
        // called when Challenge is created.
        MainSocketController.instance.sendMessageToAll({type: 'challenge', data: newObj});
        // bind transaction
        if(newObj.meta) await _db.Ledger.update({_id: _db.Ledger.convertToObjectId(newObj.meta)}, {$set: {linkedChallenge: newObj._id}});
    }

    async onChallengeUpdate({oldObj, newObj}) {
        // called when Challenge is updated.
        MainSocketController.instance.sendMessageToAll({type: 'challenge', data: newObj});
        //we need to check if old obj status is pending and new obj is created or cancelled  
        //lets assumwe the new object has already a winner in it  
        
        if(((oldObj.status==='PENDING'||oldObj.status==='STARTED')||oldObj.status==='CREATED')&&(newObj.status==='COMPLETE'||newObj.status==='CANCELLED')&&newObj.winner){  //TO DO REMOVE CREATED OLD OBJ STATUS AFTER GAME HAS BEENBINDED TO IT
            console.log("this tells us that challenge has completed so we need set winner and deduct money------ update wallet using winner id--- ");
            const winner= await UserService.findOne(newObj.winner);
            console.log("winner:-",winner);
            await this.updateWinnerWallet(winner,newObj);
        }else if(newObj.status==='STARTED'){
            console.log("this tells us that challenge has started so we need set contender--");  //TO DO 
        }
    }

    async updateWinnerWallet(winner,challenge){
        const wallet=await WalletService.findOne(winner?.wallet);       //after this create a ledger before adding money to wallet also 
        console.log("wallet=------------",wallet);
        wallet.bal=wallet.bal+(2*parseFloat(challenge?.amount))-5;
        wallet.earning=(wallet?.earning||0)+parseFloat(challenge?.amount)-5;
        //update the ledger first
        const from=(challenge?.challenger===challenge?.winner?challenge?.contender:challenge?.contender);
        console.log("FromUser-------",from);
        //first update ledger----- for challenge and then add it to wallet------
        const objDto={fromUser:from,toUser:winner._id,txType:'TRANSFER'};
        const ledgerDto=new LedgerDTO(objDto);
        console.log("ledger Dto updtaing Ledger:-----",ledgerDto);
        const ledgerResp= await LedgerService.update(challenge?.meta,ledgerDto,winner);
        let Dto;
        const walletObj={bal:wallet?.bal,earning:wallet?.earning,ledger:challenge?.meta}
        Dto=new WalletDTO(walletObj);
        const resUpdate=await WalletService.update(wallet._id,Dto,winner);
        console.log("response-=======------ ",resUpdate);
    }

    onChallengeDelete(id) {
        // called when Challenge is deleted.
        MainSocketController.instance.sendMessageToAll({type: 'challenge-remove', id: id});
    }

}

exports = module.exports = ChallengeHook;
