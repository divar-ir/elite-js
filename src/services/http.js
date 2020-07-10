import axios from 'axios';

import { getToken } from 'src/utils/auth';
import { getEnv } from 'src/utils/env';

axios.defaults.baseURL = getEnv('API_BASE');

function withAuthorizationHeader(config) {
  const token = getToken();

  if (!token) {
    return config;
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Basic ${token}`,
    },
  };
}

function request(url, config = {}) {
  const { withToken, ...baseConfig } = config;
  let options = baseConfig;

  if (withToken) {
    options = withAuthorizationHeader(baseConfig);
  }

  return axios.request(url, options);
}

const http = {
  get: request,
  post: (url, config) => request(url, { ...config, method: 'POST' }),
  put: (url, config) => request(url, { ...config, method: 'PUT' }),
  delete: (url, config) => request(url, { ...config, method: 'DELETE' }),
};

export default http;
