import React from 'react';
import Helmet from 'react-helmet';
import {StaticRouter} from 'react-router-dom';
import {renderToString} from 'react-dom/server';
import {matchRoutes} from 'react-router-config';
import {Provider} from 'react-redux';

import clientEnv from 'environments/client';
import routes from 'src/configs/routes';
import {createNewStore} from 'src/store';
import {createNewContext} from 'src/initialSSRData';
import {initSSRContextValue} from 'src/initialSSRData/utils';
import {getEnv, isProd} from 'src/utils/env';
import AppRouter from 'src/AppRouter';

import {findFinalComponent} from '../utils';
import pageTemplate from '../templates/page-template.hbs';

// eslint-disable-next-line import/no-dynamic-require
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

function renderPage({appHtml, preloadedData, preloadedState}) {
    const head = Helmet.renderStatic();
    const title = head ? head.title.toString() : '';
    const meta = head ? head.meta.toString() : '';
    const link = head ? head.link.toString() : '';
    const script = head ? head.script.toString() : '';
    const html = pageTemplate({
        appHtml: appHtml.toString(),
        PRELOADED_DATA_KEY: getEnv('PRELOADED_DATA_KEY'),
        PRELOADED_STATE_KEY: getEnv('PRELOADED_STATE_KEY'),
        preloadedData: JSON.stringify(preloadedData),
        preloadedState: JSON.stringify(preloadedState),
        assets,
        meta,
        link,
        script,
        title,
        isProd,
        env: JSON.stringify(clientEnv),
    });

    return html;
}

function getInitialPropsList({renderBranch, store: {getState, dispatch}, req}) {
    return renderBranch.reduce(
        (initialPropsList, {route: {component, path}}) => {
            // Due to usage of HOCs, we have to traverse the component tree
            // to find the final wrapped component which contains the static server-side methods
            const {
                component: {serverSideInitial},
                hasSSRData: hasPreloadedData,
            } = findFinalComponent(component);

            if (!serverSideInitial) {
                return initialPropsList;
            }

            return initialPropsList.concat({
                path,
                hasPreloadedData,
                dataPromise: serverSideInitial({getState, dispatch, req}),
            });
        },
        [],
    );
}

function getPreloadedData({initialDataList, initialPropsList}) {
    return initialDataList.reduce((preloadedData, data, index) => {
        const {path, hasPreloadedData} = initialPropsList[index];
        if (!hasPreloadedData) {
            return preloadedData;
        }

        return {
            ...preloadedData,
            [path]: data,
        };
    }, {});
}

function getPageMarkup({
                           store, context, preloadedData, location,
                       }) {
    const {Provider: InitialSSRDataProvider} = createNewContext();

    return renderToString(
        <Provider store={store}>
            <InitialSSRDataProvider value={initSSRContextValue(preloadedData)}>
                <StaticRouter context={context} location={location}>
                    <AppRouter/>
                </StaticRouter>
            </InitialSSRDataProvider>
        </Provider>,
    );
}

function handleSSR(req, res, next) {
    const context = {};
    const store = createNewStore();
    const renderBranch = matchRoutes(routes, req.url);
    const initialPropsList = getInitialPropsList({
        renderBranch,
        store,
        req,
    });

    const initialDataPromises = initialPropsList.map(
        ({dataPromise}) => dataPromise,
    );

    Promise.all(initialDataPromises)
        .then((initialDataList) => {
            const preloadedData = getPreloadedData({
                initialDataList,
                initialPropsList,
            });

            // note that calling `getPageMarkup` might cause `context` value to update!
            const markup = getPageMarkup({
                store,
                context,
                preloadedData,
                location: req.url,
            });

            if (context.url) {
                res.redirect(context.url);
            } else {
                res.status(200).send(
                    renderPage({
                        appHtml: markup,
                        preloadedData,
                        preloadedState: store.getState(),
                    }),
                );
            }
        })
        .catch(next);
}

export default handleSSR;
