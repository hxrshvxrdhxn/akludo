import { call, put, takeEvery } from "redux-saga/effects";
import { storeAllUserData, storeAppUseCase, storePayrentInfo
} from "./actions";
import { HITUSER, HITREFERALCODE, HITAPPUSECASE, HITPAYRENTINFO, HITPAYRENTINFOAPI,EKYC
} from '../types'
import { getUserData, getUserGeneralDetails
} from "./api";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getData(action) {
    try {
        console.log("?????????")
        const data = yield call(getUserData, action.payload);
        console.log("klklklklk?????")
        console.log(data)
        //TODO
        //Put error check on data and then yield
        yield put(storeAllUserData(data.data.data));
    } catch (e) {
        console.log(e);
    }
}

function* getReferal(action) {
    try {
        const data = yield call(getUserGeneralDetails, action.payload);
        if (data.data.error) {

        }
    } catch (e) {
        console.log(e);
    }
}


export function* watchUserData() {
    yield takeEvery(HITUSER, getData);
}
