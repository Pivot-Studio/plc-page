import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import wasm from 'vite-plugin-wasm';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import topLevelAwait from 'vite-plugin-top-level-await';
import { prismjsPlugin } from 'vite-plugin-prismjs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    topLevelAwait(),
    wasm(),
    (monacoEditorPlugin as any).default({}),
    prismjsPlugin({
      languages: ['bash'],
      plugins: ['line-numbers', 'copy-to-clipboard'], //官网有其他功能,这里开启行数和复制按钮功能
      theme: 'twilight',
      css: true,
    }),
  ],
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
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
});
