/* eslint-disable no-console */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';

import { getRouteProps, getServerSideMethods } from './utils.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = process.cwd();
const isProd = process.env.NODE_ENV === 'production';
const PORT = 5173;

(async () => {
  const { app } = await createServer();
  await app.listen(PORT);
  console.log(`🚀 Elite 🚀 is on air: http://localhost:${PORT}`);
})();

async function createServer() {
  const app = express();

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;
  if (!isProd) {
    vite = await createViteDevServer();
    app.use(vite.middlewares);
  } else {
    app.use(
      // eslint-disable-next-line import/no-extraneous-dependencies
      (await import('serve-static')).default(resolve('../dist'), {
        index: false,
      })
    );
  }

  app.use('*', createSSFHandler(vite));

  return { app, vite };
}

function resolve(p) {
  return path.resolve(__dirname, p);
}

async function createViteDevServer() {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const vite = await import('vite');
  const viteServer = await vite.createServer({
    root,
    logLevel: 'info',
    server: {
      middlewareMode: true,
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
    appType: 'custom',
  });

  return viteServer;
}

function createSSFHandler(vite) {
  return async (req, res) => {
    try {
      const url = req.originalUrl;

      let template = await getTemplate(url, vite);

      const {
        location, matchedRoutes, route, params
      } = getRouteProps(req);

      const {
        getSSFDataList,
      } = getServerSideMethods(matchedRoutes);

      console.log(getSSFDataList)


      // FIXME: data coming from loaders
      const data = {
        awesome: 'elite.js',
      };

      template = template.replace(
        '<!--hydration-->',
        `<script>window.hydration = ${JSON.stringify(data)}</script>`
      );

      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      if (!isProd) {
        vite.ssrFixStacktrace(e);
      }
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  }
}

async function getTemplate(url, vite) {
  if (isProd) {
    return fs.readFileSync(resolve('../dist/index.html'), 'utf-8');
  }

  return vite.transformIndexHtml(
    url,
    fs.readFileSync(resolve('../index.html'), 'utf-8')
  );
}
