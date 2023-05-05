import { PHONE_NUMBER, ADD_MONEY, ADD_AMOUNT, USER_ID, CHALLENGE_ITEM, CHALLENGE_OPEN } from './actions';
const INITIAL_STATE = {
  phone: null,
  money: 0,
  amount: 0,
  uid: 'me',
  challenge: '',
  openChallenges: ''
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


    default:
      return state;
  }
}
export default reducer;