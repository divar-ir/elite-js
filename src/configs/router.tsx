import { createBrowserRouter } from 'react-router-dom';

import First from '../views/first';
import Second from '../views/second';

const router = createBrowserRouter([
  {
    path: '/',
    element: <First />,
  },
  {
    path: '/second',
    element: <Second />,
  },
]);

export default router;
