import { PHONE_NUMBER, ADD_MONEY, ADD_AMOUNT, USER_ID, CHALLENGE_ITEM, CHALLENGE_OPEN, WALLET } from './actions';
const INITIAL_STATE = {
  phone: null,
  money: null,
  amount: null,
  uid: 'me',
  challenge: '',
  openChallenges: '',
  wallet : {}
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {

    case PHONE_NUMBER:
      console.log("reducer add phone:---------->", action.phone)
      return { phone: action.phone };

    case ADD_MONEY:
      console.log("reducer add money:---------->", action.money)
      return { money: action.money };

    case ADD_AMOUNT:
      console.log("reducer add amount:---------->", action.amount.amount)
      return { amount: action.amount.amount };

    case USER_ID:
      console.log("user Id:", action.uid)
      return { userId: action.uid };

    case CHALLENGE_ITEM:
      console.log("reducer chanllenge-------------------->:", action.challenge)
      return { challenge: action.challenge };

    case CHALLENGE_OPEN:
      console.log("reducer Open chanllenge-------------------->:", action.openChallenges)
      return { openChallenges: action.openChallenges };

    case WALLET:
      console.log("reducer wallet-------------------->:", action.wallet)
      return { wallet: action.wallet };

    default:
      return state;
  }
}
export default reducer;