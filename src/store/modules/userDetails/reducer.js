import {
  USER_DATA, LOGOUT, USERAPPUSECASE, STOREPAYRENTDATA, EKYC
} from '../types'

const INITIAL_STATE = {};

// auth reducer
export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_DATA:
      return { ...state, userData: action.payload };
    case LOGOUT:
      return INITIAL_STATE;
    case EKYC:
      return { ...state, ekycData: action.payload.userData }

    default:
      return state;
  }
}
