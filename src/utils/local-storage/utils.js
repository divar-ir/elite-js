import { isServerSide } from 'src/utils/env';

export function getItem(key) {
  if (isServerSide()) {
    return undefined;
  }

  return localStorage.getItem(key);
}

export function setItem(key, value) {
  if (!isServerSide()) {
    localStorage.setItem(key, value);
  }
}

export function removeItem(key) {
  if (!isServerSide()) {
    localStorage.removeItem(key);
  }
}
