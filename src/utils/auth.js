import { StorageAccessor } from 'src/utils/local-storage';

const TOKEN_KEY = 'token';
const token = new StorageAccessor(TOKEN_KEY);

export function getToken() {
  return token.value;
}

export function saveToken(value) {
  token.value = value;
}

export function removeToken() {
  token.reset();
}

export function isUserLoggedIn() {
  return Boolean(getToken());
}
