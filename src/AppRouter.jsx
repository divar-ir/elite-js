import { renderRoutes } from 'react-router-config';

import routes from 'src/configs/routes';

function AppRouter() {
  return renderRoutes(routes);
}

export default AppRouter;
