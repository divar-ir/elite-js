import { isProd } from 'src/utils/env';
import errorPage from '../templates/error-template.hbs';

/**
 * Error-handling middleware always takes four arguments. You must provide four arguments
 * to identify it as an error-handling middleware function. Even if you don’t need to use
 * the next object, you must specify it to maintain the signature. Otherwise,
 * the next object will be interpreted as regular middleware and will fail to handle errors.
 * ref: http://expressjs.com/en/guide/error-handling.html
 */
// eslint-disable-next-line no-unused-vars
function errorMiddleware(err, req, res, next) {
  const status = err.status || 500;
  let response;

  if (isProd) {
    response = errorPage({ status });
  } else {
    const message = err.message || `Internal Server Error (${status})`;
    response = `${message}<br/><pre>${err.stack || ''}</pre>`;
  }
  res.status(status).send(response);
}

export default errorMiddleware;
