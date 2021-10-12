'use strict';
const path = require('path');
const SizePlugin = require('size-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => ({
  devtool: 'source-map',
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true,
  },
  entry: {
    content: './src/content',
    background: './src/background',
    options: './src/options',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new SizePlugin(),
    new CopyWebpackPlugin({patterns: [
      {
        from: '*',
        context: 'src',
        globOptions: {
          ignore: ['*.js', '*.ts', '*.tsx'],
        }
      },
      {
        from: 'node_modules/webextension-polyfill/dist/browser-polyfill.min.js',
      },
      {
        from: 'manifest.json',
      },
    ]}),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
    // Without this, function names will be garbled and enableFeature won't work
    concatenateModules: true,

    // Automatically enabled on production; keeps it somewhat readable for AMO reviewers
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          mangle: false,
          compress: false,
          output: {
            beautify: true,
            indent_level: 2, // eslint-disable-line @typescript-eslint/camelcase
          },
        },
      }),
    ],
  },
});
