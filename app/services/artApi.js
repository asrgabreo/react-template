import { generateApiClient } from '@utils/apiUtils';
const artApi = generateApiClient('itune');

export const getArts = artName => artApi.get(`/search/artists?term=${artName}`);
