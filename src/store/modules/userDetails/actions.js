import {
  USER_DATA, EKYC
} from '../types'

export const storeAllUserData = data =>
({
  type: USER_DATA,
  payload: data
});

export const hitEkyc = data => ({
  type: EKYC,
  payload: data
});