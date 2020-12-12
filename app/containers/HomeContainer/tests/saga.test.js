/**
 * Test homeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getArts } from '@app/services/artApi';
import { apiResponseGenerator } from '@utils/testUtils';
import homeContainerSaga, { getItuneArts } from '../saga';
import { homeContainerTypes } from '../reducer';

describe('HomeContainer saga tests', () => {
  const generator = homeContainerSaga();
  const artName = 'mac';
  let getItuneArtsGenerator = getItuneArts({ artName });

  it('should start task to watch for REQUEST_GET_ITUNE_ARTS action', () => {
    expect(generator.next().value).toEqual(takeLatest(homeContainerTypes.REQUEST_GET_ITUNE_ARTS, getItuneArts));
  });

  it('should ensure that the action FAILURE_GET_ITUNE_ARTS is dispatched when the api call fails', () => {
    const res = getItuneArtsGenerator.next().value;
    expect(res).toEqual(call(getArts, artName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching ART informations.'
    };
    expect(getItuneArtsGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: homeContainerTypes.FAILURE_GET_ITUNE_ARTS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_ITUNE_ARTS is dispatched when the api call succeeds', () => {
    getItuneArtsGenerator = getItuneArts({ artName });
    const res = getItuneArtsGenerator.next().value;
    expect(res).toEqual(call(getArts, artName));
    const artsResponse = {
      resultCount: 1,
      results: [{ artistName: artName }]
    };
    expect(getItuneArtsGenerator.next(apiResponseGenerator(true, artsResponse)).value).toEqual(
      put({
        type: homeContainerTypes.SUCCESS_GET_ITUNE_ARTS,
        data: artsResponse
      })
    );
  });
});
