import { PHONE_NUMBER, ADD_MONEY, ADD_AMOUNT, USER_ID } from './actions';
const INITIAL_STATE = {
  phone: null,
  money: 0,
  amount: 0,
  uid:'me'
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {

    case PHONE_NUMBER:
      console.log(action.phone)
      return { phone: action.phone };

    case ADD_MONEY:
      console.log(action.money)
      return { money: action.money };

    case ADD_AMOUNT:
      console.log(action.amount)
      return { amount: action.amount };

    case USER_ID:
      console.log(action.uid)
      return { userId: action.uid };


    default:
      return state;
  }
}
export default reducer;