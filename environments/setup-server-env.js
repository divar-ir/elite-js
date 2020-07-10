const baseEnv = require('./base');

global.env = {
  ...process.env,
  ...baseEnv,
};
