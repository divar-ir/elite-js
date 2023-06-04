/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['supports es6-module', 'not dead', 'not op_mini all'],
      modernPolyfills: true,
    }),
  ],
  build: {
    minify: false,
  },
});
