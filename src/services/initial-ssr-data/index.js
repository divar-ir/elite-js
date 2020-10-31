import { createContext } from 'react';

let SSRContext = createContext();

export function createNewContext() {
  SSRContext = createContext();

  return SSRContext;
}

export function getContext() {
  return SSRContext;
}
