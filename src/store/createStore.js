import "regenerator-runtime/runtime";
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import createSagaMiddleware from 'redux-saga';
import "regenerator-runtime/runtime";


const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
