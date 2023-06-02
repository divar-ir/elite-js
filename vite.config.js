import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import legacy from '@vitejs/plugin-legacy';
import eslintPlugin from 'vite-plugin-eslint';

import { join, dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const path = fileURLToPath(new URL(import.meta.url))
const root = resolve(dirname(path), 'src');

export default defineConfig({
  root,
  esbuild: {
    jsxInject: 'import React from "react"',
  },
  plugins: [
    react(),
    eslintPlugin({ include: 'src/**/*.+(js|jsx|ts|tsx)', cache: false }),
    legacy({
      targets: ["supports es6-module", "not dead", "not op_mini all", "not ie all"],
      modernPolyfills: true,
    }),
  ],
})
