import { LOGIN, LOGOUT, HITLOGOUT, LOGINERROR } from '../types'

export const storeToken = data =>
({
  type: LOGIN,
  payload: data
});

export const storeError = data =>
({
  type: LOGINERROR,
  payload: data
});


export const appLogout = () =>
({
  type: LOGOUT
});

export const hitLogout = () =>
({
  type: HITLOGOUT
});
