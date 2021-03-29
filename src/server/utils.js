import { getEnv } from 'src/utils/env';

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
