import { PHONE_NUMBER, ADD_MONEY, ADD_AMOUNT } from './actions';
const INITIAL_STATE = {
  phone: null,
  money: 0,
  amount: 0
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {

    case PHONE_NUMBER:
      console.log(action.phone.phone)
      return { phone: action.phone.phone };

    case ADD_MONEY:
      console.log(action.money.money)
      return { money: action.money.money };

    case ADD_AMOUNT:
      console.log(action.amount.amount)
      return { amount: action.amount.amount };

    default:
      return state;
  }
}
export default reducer;