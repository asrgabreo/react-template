import { put, call, takeLatest } from 'redux-saga/effects';
import { getArts } from '@app/services/artApi';
import { homeContainerTypes, homeContainerCreators } from './reducer';

const { REQUEST_GET_ITUNE_ARTS } = homeContainerTypes;
const { successGetItuneArts, failureGetItuneArts } = homeContainerCreators;
export function* getItuneArts(action) {
  const response = yield call(getArts, action.artName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetItuneArts(data));
  } else {
    yield put(failureGetItuneArts(data));
  }
}
// Individual exports for testing
export default function* homeContainerSaga() {
  yield takeLatest(REQUEST_GET_ITUNE_ARTS, getItuneArts);
}
