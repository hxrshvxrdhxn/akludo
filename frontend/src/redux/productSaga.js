import { takeEvery, put } from "redux-saga/effects";
import { PRODUCT_LIST, SEARCH_PRODUCT, SET_PRODUCT_LIST } from "./constant";

function* getProducts() {
  // let data = yield fetch('http://localhost:3500/products');
  let data = [
    { name: "Product 10", id: 10, quanty: 10 },
    { name: "Product 11", id: 11, quanty: 11 },
    { name: "Product 14", id: 14, quanty: 12 }
  ];
  data = yield data.json();
  console.warn("action is called", data);
  yield put({ type: SET_PRODUCT_LIST, data });
}

function* searchProducts(data) {
  let result = yield fetch(`http://localhost:3500/products?q=${data.query}`);
  result = yield result.json();
  console.warn("action is called", result);
  yield put({ type: SET_PRODUCT_LIST, data: result });
}

function* productSaga() {
  yield takeEvery(PRODUCT_LIST, getProducts);
  yield takeEvery(SEARCH_PRODUCT, searchProducts);
}

export default productSaga;
