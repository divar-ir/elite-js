import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = process.cwd();
const isProd = process.env.NODE_ENV === 'production';

(async function start() {
  const { app } = await createServer();
  await app.listen(5173);
  // eslint-disable-next-line no-console
  console.log('app listening on port 5173, link: http://localhost:5173');
})();

async function createServer(hmrPort) {
  const app = express();

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;
  if (!isProd) {
    vite = await createViteServer(hmrPort);
    app.use(vite.middlewares);
  } else {
    app.use(
      // eslint-disable-next-line import/no-extraneous-dependencies
      (await import('serve-static')).default(resolve('../dist'), {
        index: false,
      })
    );
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      let template = getTemplate(url, vite)

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
      // eslint-disable-next-line no-console
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

function resolve(p) {
  return path.resolve(__dirname, p);
}

async function createViteServer(hmrPort) {
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
      hmr: {
        port: hmrPort,
      },
    },
    appType: 'custom',
  });

  return viteServer;
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
