const Hook = require('./base/Hook');
const MainSocketController = require('../sockets/MainSocketController');
const { getCurrentUser } = require('../services/paymentgateway/TransactionService');
const UserService = require('../services/UserService');
const WalletService = require('../services/WalletService');
const WalletDTO = require('../util/beans/WalletDTO');
const LedgerDTO = require('../util/beans/LedgerDTO');
const LedgerService = require('../services/LedgerService');

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
        //we need to check if old obj status is pending and new obj is created or cancelled  WE CAN ADD MORE STATUS
        //lets assumwe the new object has already a inner in it  
        console.log("winnner--",newObj.winner);
        const winner= await UserService.findOne(newObj.winner);
        console.log("winner:-",winner);
        if(((oldObj.status==='PENDING'||oldObj.status==='STARTED')||oldObj.status==='CREATED')&&(newObj.status==='COMPLETE'||newObj.status==='CANCELLED')){  //TO DO REMOVE CREATED OLD OBJ STATUS AFTER GAME HAS BEENBINDED TO IT
            console.log("this tells us that challenge has completed so we need set winner and deduct money------ update wallet using winner id--- ");
            await this.updateWinnerWallet(winner,newObj);
        }else if(newObj.status==='STARTED'){
            console.log("this tells us that challenge has started so we need set contender--");  //TO DO 
        }else{
            console.log("lol")
        }
    }

    async updateWinnerWallet(winner,challenge){
        const wallet=await WalletService.findOne(winner?.wallet);  //to do create a ledger and bank transaction before adding money to wallet also 
        console.log("wallet=------------",wallet);
        wallet.bal+=parseFloat(challenge?.amount);
        wallet.earning+=parseFloat(challenge?.amount);
        //update the ledger first
        const objDto={toUser:winner._id,txType:'TRANSFER'}
        const ledgerDto=new LedgerDTO(objDto);
        const ledgerResp= LedgerService.update(challenge.meta,objDto,winner); 
        let Dto;
        if(winner._id===challenge.challenger){
            const obj={bal:wallet?.bal,earning:wallet?.earning}
            Dto=new WalletDTO(obj);
        }else if(winner._id===challenge.contender){
            //get all the ledgers for this person
            const obj={bal:wallet?.bal,earning:wallet?.earning,ledger:challenge.meta}
            Dto=new WalletDTO(obj);
        }
        console.log("Dto===--",Dto);
        const resUpdate=await WalletService.update(wallet._id,Dto,winner);
        console.log("response-=======------ ",resUpdate);
    }

    onChallengeDelete(id) {
        // called when Challenge is deleted.
        MainSocketController.instance.sendMessageToAll({type: 'challenge-remove', id: id});
    }

}

exports = module.exports = ChallengeHook;
