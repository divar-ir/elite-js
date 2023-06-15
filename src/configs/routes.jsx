import Index from '@/views/Index';
import First from '@/views/First';
import Second from '@/views/Second';

export default [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: 'first',
    children: [
      {
        index: true,
        element: <First />,
      },
      {
        path: '/first/second',
        element: <Second />,
      },
    ],
  },
];
