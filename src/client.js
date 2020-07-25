import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from 'src/store';
import { getContext } from 'src/services/initial-ssr-data';
import initialSSRDataValue from 'src/services/initial-ssr-data/client';

import 'src/styles/main.scss';

// To give components styles more priority.
import AppRouter from 'src/AppRouter';

const { Provider: InitialSSRDataProvider } = getContext();

hydrate(
  <Provider store={store}>
    <InitialSSRDataProvider value={initialSSRDataValue}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </InitialSSRDataProvider>
  </Provider>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}
