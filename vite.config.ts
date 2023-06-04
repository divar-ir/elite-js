import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import legacy from '@vitejs/plugin-legacy';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({ include: 'src/**/*.+(js|jsx|ts|tsx)', cache: false }),
    legacy({
      targets: ["supports es6-module", "not dead", "not op_mini all"],
      modernPolyfills: true,
    }),
  ],
  build: {
    minify: false,
  },
})
