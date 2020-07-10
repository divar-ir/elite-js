const { isDev } = require('src/utils/env');

const baseEnv = require('./base');

let clientEnv = {
  ...baseEnv,
  SOME_KEY: 'xxxx-yyyy-zzzz-ssss',
};

const devEnv = {
  API_BASE: 'https://mock.com',
};

if (isDev) {
  clientEnv = {
    ...clientEnv,
    ...devEnv,
  };
}

module.exports = clientEnv;
