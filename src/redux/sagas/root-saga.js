import { fork } from 'redux-saga/effects';
import CustomerSaga from './customerSaga';

export default function* rootSaga() {
  try {
    yield fork(CustomerSaga);
  } catch (error) {
    console.log(444, error);
  }
}
