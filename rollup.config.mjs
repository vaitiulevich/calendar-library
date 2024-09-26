import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import path from 'path';
import svgr from '@svgr/rollup';
import image from 'rollup-plugin-image';
import alias from 'rollup-plugin-alias';

import { createRequire } from 'node:module';
const requireFile = createRequire(import.meta.url);
const packageJson = requireFile('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
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
    ],
    plugins: [
      peerDepsExternal(),
      alias({
        entries: [
          {
            find: '@components',
            replacement: path.resolve(__dirname, 'src/components'),
          },
          { find: '@icons', replacement: path.resolve(__dirname, 'src/icons') },
          { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
          {
            find: '@constants',
            replacement: path.resolve(__dirname, 'src/constants'),
          },
          {
            find: '@decorators',
            replacement: path.resolve(__dirname, 'src/decorators'),
          },
          {
            find: '@services',
            replacement: path.resolve(__dirname, 'src/services'),
          },
          {
            find: '@types',
            replacement: path.resolve(__dirname, 'src/types'),
          },
          { find: '*', replacement: path.resolve(__dirname, 'src/') },
        ],
      }),
      resolve(),
      commonjs(),
      typescript(),
      svgr(),
      image(),
      postcss({
        extensions: ['.css'],
      }),
    ],
  },
  {
    input: 'lib/index.d.ts',
    output: [{ file: 'lib/index.d.ts', format: 'es' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
