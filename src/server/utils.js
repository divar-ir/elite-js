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
