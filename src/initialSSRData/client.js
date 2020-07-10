import { getEnv } from 'src/utils/env';

import { initSSRContextValue } from './utils';

const preloadedDataString = window[getEnv('PRELOADED_DATA_KEY')];
const preloadedData = typeof preloadedDataString !== 'undefined'
  ? JSON.parse(preloadedDataString)
  : {};

export default initSSRContextValue(preloadedData);
