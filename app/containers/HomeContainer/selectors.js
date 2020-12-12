import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

const selectHomeContainerDomain = state => state.homeContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */

export const selectHomeContainer = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => substate
  );

export const selectArtsData = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => get(substate, 'artsData', null)
  );

export const selectArtsError = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => get(substate, 'artsError', null)
  );

export const selectArtName = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => get(substate, 'artName', null)
  );

export default selectHomeContainer;
