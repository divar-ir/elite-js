// eslint-disable-next-line import/prefer-default-export
export function getDisplayName({ component, hocName }) {
  const wrappedComponentName = component.displayName || component.name || 'Component';

  return `${hocName}(${wrappedComponentName})`;
}
