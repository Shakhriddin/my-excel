const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

function optimization() {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [new TerserPlugin(), new CssMinimizerPlugin()];
  }

  return config;
}

const cssLoaders = (extra) => {
  const loader = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {},
    },
    'css-loader',
  ];

  if (extra) {
    loader.push(extra);
  }

  return loader;
};

const jsLoaders = () => {
  const loader = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  ];

  if (isDev) {
    loader.push('eslint-loader');
  }

  return loader;
};

function plugins() {
  const base = [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ];

  if (isProd) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return base;
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  optimization: optimization(),
  devServer: {
    port: 3000,
    hot: isDev,
  },
  devtool: isDev ? 'source-map' : '',
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
};
