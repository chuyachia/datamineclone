import { Config } from '@stencil/core';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export const config: Config = {
  globalStyle: 'src/global/app.css',
   plugins: [
    builtins(),
    globals()
  ]
};
