import { selectHomeContainer, selectArtName, selectArtsData, selectArtsError } from '../selectors';

describe('HomeContainer selector tests', () => {
  let mockedState;
  let artName;
  let artsData;
  let artsError;

  beforeEach(() => {
    artName = 'mac';
    artsData = { resultCount: 1, results: [{ artName }] };
    artsError = 'There was some error while fetching the artist details';

    mockedState = {
      homeContainer: {
        artName,
        artsData,
        artsError
      }
    };
  });
  it('should select the homeContainer state', () => {
    const homeContainerSelector = selectHomeContainer();
    expect(homeContainerSelector(mockedState)).toEqual(mockedState.homeContainer);
  });
  it('should select the artName', () => {
    const artSelector = selectArtName();
    expect(artSelector(mockedState)).toEqual(artName);
  });

  it('should select artsData', () => {
    const artsDataSelector = selectArtsData();
    expect(artsDataSelector(mockedState)).toEqual(artsData);
  });

  it('should select the artsError', () => {
    const artsErrorSelector = selectArtsError();
    expect(artsErrorSelector(mockedState)).toEqual(artsError);
  });
});
