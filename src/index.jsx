import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import Providers from '@/components/Providers';
import router from '@/configs/router';

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);
