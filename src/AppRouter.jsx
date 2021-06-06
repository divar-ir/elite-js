import routes from 'src/configs/routes';

import { renderRoutes } from './server/utils';

function AppRouter() {
  return renderRoutes(routes);
}

export default AppRouter;
