const cloneDeep = require('lodash.clonedeep');
const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');
const customConfig = require('./webpack.config');

// @TODO Change customConfig merge logic(maybe deepMerge be a good choice)
module.exports = {
  plugins: ['scss'],
  modify(config) {
    const configClone = cloneDeep(config);
    const fileLoaderIndex = configClone.module.rules.findIndex(makeLoaderFinder('file-loader'));
    const fileLoader = configClone.module.rules[fileLoaderIndex];

    configClone.resolve.alias = customConfig.resolve.alias;
    fileLoader.exclude.push(/\.hbs$/);
    configClone.module.rules = [...configClone.module.rules, ...customConfig.module.rules];

    return configClone;
  },
};
