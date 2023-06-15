import { matchRoutes } from 'react-router-dom'
import { URL } from 'url';

import routes from '../src/configs/routes.jsx';

export function getRouteProps(req) {
  const fullURL = `${req.protocol  }://${req.get('host')}${req.originalUrl}`;
  const parsedURL = new URL(fullURL)

  const location = {
    pathname: decodeURI(req.path),
    search: parsedURL.search || '',
  };

  const { route: matchedRoute, routes: matchedRoutes } = getMatchedRoutes(req.path);

  const {
    route,
    params,
  } = matchedRoute;

  return {
    location,
    matchedRoutes,
    route,
    params,
  };
}

export function getMatchedRoutes(path) {
  const serverSideRoutes = routes;
  const matchedRoutes = matchRoutes(serverSideRoutes, decodeURI(path));

  return {
    route: matchedRoutes[matchedRoutes.length - 1],
    routes: matchedRoutes,
  };
}

export function getServerSideMethods(matchedRoutes) {
  const getSSFDataList = [];
  console.log(matchedRoutes)

  matchedRoutes.forEach(({ route: { component } }) => {
    const { getSSFData } = component;

    getSSFDataList.push(getSSFData);
  });

  return {
    getSSFDataList: getSSFDataList.filter(Boolean),
  };
}
