const { env } = isServerSide() ? global : window;

function isServerSide() {
  return typeof window === 'undefined';
}

function getEnv(key) {
  return env[key];
}

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
  getEnv,
  isServerSide,
  isDev,
  isProd,
};
