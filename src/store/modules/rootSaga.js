import { all } from 'redux-saga/effects';
import { watchLogin, watchLogout, watchForgotMpin } from './auth/sagas'
import { watchUserData, watchReferalCode, watchUserUseCase
} from './userDetails/sagas'

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchLogout(),
    watchUserData(),
    watchForgotMpin(),
    watchReferalCode(),
    watchUserUseCase()
 
  ]);
}
