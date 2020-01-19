import { createSelector } from 'reselect';
import { customerSelector } from './root-selectors';

export const customersSelector = createSelector(
  customerSelector,
  state => state && state.customers
);
