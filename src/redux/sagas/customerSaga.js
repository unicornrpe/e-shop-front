import { call, put, select, takeEvery } from 'redux-saga/effects';
import { metaDataSelector } from '../selectors/root-selectors';
import GetServices from '../../services/get-services';
import {
  loadCustomersSuccess,
  loadCustomersFail,
  LOAD_CUSTOMERS_DATA
} from '../actions/customerActions';

export default function* CustomerSaga() {
  const { CustomerServices } = GetServices(yield select(metaDataSelector));

  yield takeEvery(LOAD_CUSTOMERS_DATA, loadCustomerSage);

  function* loadCustomerSage() {
    console.log(11);
    try {
      let data = yield call(CustomerServices.getCustomers);
      yield put(loadCustomersSuccess(data));
    } catch (error) {
      yield put(loadCustomersFail(error));
    } finally {
    }
  }
}
