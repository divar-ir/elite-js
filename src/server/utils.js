import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { getEnv } from 'src/utils/env';

import withSSRData from '../shared-components/withSSRData';

// Due to usage of HOCs, we have to traverse the component tree to find the
// final wrapped component which contains the static server-side methods
// eslint-disable-next-line import/prefer-default-export
export function findFinalComponent(component) {
  let comp = component;
  let isWrappedInWithSSRDataHOC = false;

  while (comp.WrappedComponent) {
    if (comp[getEnv('HAS_PRELOADED_DATA_KEY')]) {
      isWrappedInWithSSRDataHOC = true;
    }

    comp = comp.WrappedComponent;
  }

  return {
    component: comp,
    hasSSRData: isWrappedInWithSSRDataHOC,
  };
}

export function getComponent(component, routeRenderer) {
  // because route renderers are a wrapper around the actual component,
  // they return the element created by react and not the actual component so we 
  // need to point to the actual component which is stored in the 'type' property
  // in the returned react element
  const reactElement = routeRenderer ? routeRenderer() : null;
  return reactElement ? reactElement.type : component;
}

export function renderRoutes(routes, extraProps = {}, switchProps = {}) {
  if (!routes) return null;

  return (
    <Switch {...switchProps}>
      {routes.map((route, index) => {
        const { component: routeComponent, render: routeRenderer, ...rest } = route;
        const component = getComponent(routeComponent, routeRenderer);
        const { hasSSRData: wrappedInWithSSRData } = findFinalComponent(component);
        const hasServerSideInitial = component.serverSideInitial;
        const needsWithSSRData = hasServerSideInitial && !wrappedInWithSSRData;

        /* eslint react/no-array-index-key: 0 */
        return (
          <Route
            key={`route--${index}`}
            {...rest}
            render={(props) => {
              const componentProps = { ...props, ...extraProps, route };

              return (needsWithSSRData)
                ? React.createElement(withSSRData(component), componentProps)
                : React.createElement(component, componentProps)
            }}
          />
        )
      })}
    </Switch>
  );
}
