import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import Providers from './components/Providers';
import router from './configs/router';

// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-explicit-any
const data = (window as any).__SSF__;

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
      {data && <p>{JSON.stringify(data)}</p>}
    </Providers>
  </React.StrictMode>,
);
