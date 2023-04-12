import { PHONE_NUMBER } from './actions';
const INITIAL_STATE = {
  phone: null
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PHONE_NUMBER:
      console.log(action.phone.phone)
      return { phone: action.phone.phone };
    default:
      return state;
  }
}
export default reducer;