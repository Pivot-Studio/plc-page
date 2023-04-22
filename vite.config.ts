import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import wasm from "vite-plugin-wasm";
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import topLevelAwait from "vite-plugin-top-level-await";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), topLevelAwait(), wasm(), (monacoEditorPlugin as any).default({})],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve('src/base.less')}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  base: process.env.NODE_ENV === "production" ? "/" : "/",
});
