import { homeContainerTypes, homeContainerCreators } from '../reducer';

describe('HomeContainer action tests', () => {
  it('has a type of REQUEST_GET_ITUNE_ARTS', () => {
    const expected = {
      type: homeContainerTypes.REQUEST_GET_ITUNE_ARTS,
      artName: 'artName'
    };
    expect(homeContainerCreators.requestGetItuneArts('artName')).toEqual(expected);
  });
});
