export const MODULE_NAME = 'page/alert';

export const action = actionType => `${MODULE_NAME}/${actionType}`;

export let ActionCreate = (type, payload = {}) => ({
  type,
  payload
});

export const LOAD_CUSTOMERS_DATA = action('LOAD_CUSTOMERS_DATA');

export const LOAD_CUSTOMERS_SUCCESS = action('LOAD_CUSTOMERS_SUCCESS');
export const LOAD_CUSTOMERS_FAIL = action('LOAD_CUSTOMERS_FAIL');

export const loadCustomersData = data =>
  ActionCreate(LOAD_CUSTOMERS_DATA, data);
export const loadCustomersSuccess = data =>
  ActionCreate(LOAD_CUSTOMERS_SUCCESS, data);
export const loadCustomersFail = data =>
  ActionCreate(LOAD_CUSTOMERS_FAIL, data);
