import fs from "node:fs";
import path from "node:path";
import { globSync } from "glob";
import { fileURLToPath } from "node:url";
import express from "express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = process.cwd();
const isProd = process.env.NODE_ENV === "production";

(async function start() {
  const { app } = await createServer();
  await app.listen(5173);
  console.log("app listening on port 5173");
  console.log("http://localhost:5173");
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
      (await import("serve-static")).default(resolve("../dist/client"), {
        index: false,
      })
    );
  }

  // TODO: fix this for production as vite will not create in prod
  const loadModules = createModulesLoader(vite);
  const viewsPath = getViewsPath();
  const viewFiles = getViewFiles(viewsPath);
  const modules = await loadModules(viewFiles);

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;

      let template;
      if (!isProd) {
        template = fs.readFileSync(resolve("../index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
      } else {
        template = fs.readFileSync(resolve("../dist/client/index.html"), "utf-8");
      }

      const matchedRoute = matchModule(url, modules, viewsPath);

      if (!matchedRoute) {
        return res.status(404).send("not found");
      }

      // TODO: handle client side loaders
      // TODO: handle nested loaders
      // TODO: we can create hash functions based on file paths (they are unique) and get related data based on hash on client, just an idea 
      if (matchedRoute.module.loader) {
        const data = await matchedRoute.module.loader({ params: matchedRoute.params });
        if (data) {
          template = template.replace("<!--hydration-->", `<script>window.hydration = ${JSON.stringify(data)}</script>`);
        }
      }

      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e);
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
  const vite = await import("vite");
  const viteServer = await vite.createServer({
    root,
    logLevel: "info",
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
    appType: "custom",
  });

  return viteServer;
}

function getViewsPath() {
  return path.join(__dirname, "../client/views");
}

function getViewFiles(viewsPath) {
  return globSync(`${viewsPath}/**/*.{js,jsx,ts,tsx}`);
}

function createModulesLoader(vite) {
  return async function loadModules(files) {
    const modules = await Promise.all(files.map((file) => vite.ssrLoadModule(file)));
    const modulesMap = new Map(modules.map((module, index) => [files[index], module]));
    return modulesMap;
  };
}

function matchModule(url, modulesMap, modulesDirectory) {
  for (const [modulePath, module] of modulesMap.entries()) {
    const relativePath = path.relative(modulesDirectory, modulePath);
    const routePattern =
      ("/" + relativePath)
        .replace(/\.[jt]sx?$/, "")
        .replace(/\[(.*?)\]/g, ":$1")
        .replace(/\/index$/, "") || "/";

    const matchedRoute = matchRoute(url, routePattern);
    if (matchedRoute) {
      return {
        module,
        params: matchedRoute,
      };
    }
  }
  return null;
}

function matchRoute(input, routePattern) {
  const regexPattern = routePattern.replace(/:\w+/g, "(.+)").replace(/\//g, "\\/");

  const regex = new RegExp(`^${regexPattern}$`);

  const match = input.match(regex);

  if (!match) {
    return null;
  }

  const params = match.slice(1);
  return params;
}
