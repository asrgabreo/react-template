import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getArts } from '../artApi';

describe('ArtApi tests', () => {
  const artistName = 'mac';
  it('should make the api call to "/search/artists?term="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        resultCount: 1,
        results: [{ artistName }]
      }
    ];
    mock.onGet(`/search/artists?term=${artistName}`).reply(200, data);
    const res = await getArts(artistName);
    expect(res.data).toEqual(data);
  });
});
