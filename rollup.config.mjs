import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import path from 'path';
import image from 'rollup-plugin-image';
import copy from 'rollup-plugin-copy';
import packageJson from './package.json' with { type: 'json' };
import alias from 'rollup-plugin-alias';
import url from '@rollup/plugin-url';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputOptions = [
  {
    file: packageJson.main,
    format: 'cjs',
    sourcemap: true,
  },
  {
    file: packageJson.module,
    format: 'esm',
    sourcemap: true,
  },
];

export default [
  {
    input: 'src/index.ts',
    output: outputOptions,
    plugins: [
      peerDepsExternal(),
      alias({
        entries: [
          {
            find: '@components/',
            replacement: path.resolve(__dirname, 'src/components'),
          },
          {
            find: '@icons/',
            replacement: path.resolve(__dirname, 'src/icons'),
          },
          {
            find: '@utils/',
            replacement: path.resolve(__dirname, 'src/utils'),
          },
          {
            find: '@constants/',
            replacement: path.resolve(__dirname, 'src/constants'),
          },
          {
            find: '@decorators/',
            replacement: path.resolve(__dirname, 'src/decorators'),
          },
          {
            find: '@services/',
            replacement: path.resolve(__dirname, 'src/services'),
          },
          {
            find: '@store/',
            replacement: path.resolve(__dirname, 'src/store'),
          },
          {
            find: '@types/',
            replacement: path.resolve(__dirname, 'src/types'),
          },
          { find: '*', replacement: path.resolve(__dirname, 'src/') },
        ],
      }),
      resolve({
        extensions: ['.js', '.ts', '.tsx', '.svg'],
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
      }),
      copy({
        targets: [{ src: 'src/icons/*', dest: 'lib/src/icons' }],
        verbose: true,
      }),
      url({
        include: ['src/icons/*.svg'],
        publicPath: './',
        emitFiles: true,
      }),
      image(),
      postcss(),
    ],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'lib/src/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
