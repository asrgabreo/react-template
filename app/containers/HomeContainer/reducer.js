/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: homeContainerTypes, Creators: homeContainerCreators } = createActions({
  requestGetItuneArts: ['artName'],
  successGetItuneArts: ['data'],
  failureGetItuneArts: ['error'],
  clearItuneArts: []
});
export const initialState = { artName: null, artsData: [], artsError: null };

/* eslint-disable default-case, no-param-reassign */
export const homeContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case homeContainerTypes.REQUEST_GET_ITUNE_ARTS:
        draft.artName = action.artName;
        break;
      case homeContainerTypes.CLEAR_ITUNE_ARTS:
        return initialState;
      case homeContainerTypes.SUCCESS_GET_ITUNE_ARTS:
        draft.artsData = action.data;
        break;
      case homeContainerTypes.FAILURE_GET_ITUNE_ARTS:
        draft.artsError = get(action.error, 'message', 'something_went_wrong');
        break;
    }
  });

export default homeContainerReducer;
