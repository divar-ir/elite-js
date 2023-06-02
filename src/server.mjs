#!/usr/bin/env node
import { fileURLToPath } from 'url';
import Fastify from 'fastify';
import FastifyVite from '@fastify/vite';
import { renderToString } from 'react-dom/server';

export async function main(dev) {
  const server = Fastify();

  await server.register(FastifyVite, {
    root: import.meta.url,
    dev: dev || process.argv.includes('--dev'),
    // spa: true,
    createRenderFunction({ createApp }) {
      console.log('helllloo');

      return () => ({
        element: '<p>test</p>',
      });
    },
  });

  server.get('*', (req, reply) => {
    reply.send({ hello: 'world' });
  });

  console.log({ vite: server.vite });
  await server.vite.ready();

  return server;
}

// if (process.argv[1] === fileURLToPath(new URL(import.meta.url))) {
// }
const server = await main();
await server.listen({ port: 3000 });
