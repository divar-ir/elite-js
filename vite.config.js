/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import legacy from '@vitejs/plugin-legacy';
import eslintPlugin from 'vite-plugin-eslint';
import { fileURLToPath } from 'url';


export default defineConfig({
  esbuild: {
    jsxInject: 'import React from "react"',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    react(),
    eslintPlugin({ include: 'src/**/*.+(js|jsx|ts|tsx)', cache: false }),
    legacy({
      targets: ['supports es6-module', 'not dead', 'not op_mini all'],
      modernPolyfills: true,
    }),
  ],
});
