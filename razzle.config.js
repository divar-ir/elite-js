const cloneDeep = require('lodash.clonedeep');
// eslint-disable-next-line import/no-extraneous-dependencies
const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');
const customConfig = require('./webpack.config');

// @TODO Change customConfig merge logic(maybe deepMerge be a good choice)
module.exports = {
    plugins: ['scss', {
        name: 'typescript',
        options: {
            useBabel: false,
            tsLoader: {
                transpileOnly: true,
                experimentalWatchApi: true,
            },
            forkTsChecker: {
                tsconfig: './tsconfig.json',
                watch: './src',
                typeCheck: true,
            },
        },
    }],
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
