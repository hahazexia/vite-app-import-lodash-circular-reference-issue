import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: './',
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/assets/tzx.scss" as *;',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'es2022',
    sourcemap: false,
    minify: true,
    // terserOptions: {
    //   compress: {
    //     drop_console: false,
    //     drop_debugger: false,
    //   },
    // },
    terserOptions: undefined,
    rollupOptions: {
      output: {
        minifyInternalExports: false,
        manualChunks: null,
        compact: false,
        preserveModules: false,
        format: 'es',
      },
    },
  },
  esbuild: {
    minify: false,
    minifyIdentifiers: false,
    minifySyntax: false,
    minifyWhitespace: false,
    legalComments: 'inline',
  },
});
