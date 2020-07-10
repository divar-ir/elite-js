import express from 'express';

import handleSSR from './handlers/ssr-handler';
import errorMiddleware from './middlewares/error-middleware';
import redirectMiddleware from './middlewares/redirect-middleware';
import removeTrailingSlashHandler from './handlers/remove-trailing-slash-handler';

const server = express();

server.disable('x-powered-by');

// @TODO you might need to remove this after you configured to use CDN
server.use(express.static(process.env.RAZZLE_PUBLIC_DIR));

server.get('\\S+/$', removeTrailingSlashHandler);
server.get('/*', handleSSR);

// @TODO you might need to add sentry middleware somewhere about here
server.use(redirectMiddleware, errorMiddleware);

export default server;
