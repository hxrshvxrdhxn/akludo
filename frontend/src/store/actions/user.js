import * as types from "../types"

export function getUsers(users) {
 return {
  type: type.GET_USERS(),
  payload: users,
 }
}