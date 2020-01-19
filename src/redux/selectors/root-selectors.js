import { createSelector } from 'reselect';

export function metaDataSelector(state) {
  return state && state.metaData;
}

export const HostUrlSelector = createSelector(
  metaDataSelector,
  state => state && state.hostUrl
);

export function customerSelector(state) {
  return state && state.customer;
}
