import { call, put, takeEvery } from "redux-saga/effects";
import { storeToken, appLogout, storeError } from "./actions";
import {  } from '../types'
import { getLoginToken } from "./api";
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

function* getToken(action) {
    try {
        const data = yield call(getLoginToken, action.payload);
        cookies.set('token', data.data.data?.token);
        //console.log("hitlogin",data.data.data?.token);
        if (data.data.error){
            //console.log("log in error",data.data.error)
            yield put(storeError({error: data.data.error}));
        } else {
            yield put(storeToken({token:data.data.data.token, phone_number: action.payload.phone_number}));
        }
    } catch (e) {
        //console.log(e);
    }
}

function* getTokenForgotMpin(action) {
    try {
        cookies.set('token', action.payload.token);
        //console.log("check my action man baby",action.payload.token)
        //console.log(action)
        //console.log("teret teret teret")
        yield put(storeToken({token:action.payload.token, phone_number: action.payload.phone_number}))
    } catch (e) {
        //console.log(e);
    }
}

function* expireToken(action) {
    try {
        // do api call
        // const data = yield call(getLoginToken);
        yield put(appLogout());
    } catch (e) {
        //console.log(e);
    }
}

export function* watchLogin() {
    yield takeEvery(HITLOGIN, getToken);
}

export function* watchLogout() {
    yield takeEvery(HITLOGOUT, expireToken);
}

export function* watchForgotMpin() {
    yield takeEvery(HITFORGOTMPIN, getTokenForgotMpin);
}