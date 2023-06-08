import Index from '../views/Index';
import First from '../views/First';
import Second from '../views/Second';

export default [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/first',
    element: <First />,
  },
  {
    path: '/second',
    element: <Second />,
  },
];
