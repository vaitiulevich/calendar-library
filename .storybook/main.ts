import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-jest',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        '@components': path.resolve(__dirname, '../src/components'),
        '@icons': path.resolve(__dirname, '../src/icons'),
        '@utils': path.resolve(__dirname, '../src/utils'),
        '@constants': path.resolve(__dirname, '../src/constants'),
        '@decorators': path.resolve(__dirname, '../src/decorators'),
        '@services': path.resolve(__dirname, '../src/services'),
        '@store': path.resolve(__dirname, '../src/store'),
        '@tests': path.resolve(__dirname, '../src/tests'),
        '@hooks': path.resolve(__dirname, '../src/hooks'),
        '@types': path.resolve(__dirname, '../src/types'),
      };
    }
    return config;
  },
};
export default config;
