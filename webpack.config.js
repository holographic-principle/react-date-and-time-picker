// https://v1.dhruvkumarjha.com/articles/introduction-to-creating-react-components-and-publishing-them-to-npm
// https://www.valentinog.com/blog/webpack-4-tutorial/
// https://github.com/webpack/docs/wiki/configuration

const path = require('path');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

const eslintLoader = {
  enforce: 'pre',
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'eslint-loader',
};
const babelLoader = {
  loader: 'babel-loader',
  test: /.js$/,
  exclude: /node_modules/,
  options: {
    presets: ['@babel/preset-env', '@babel/preset-react']
  },
};
const cssExtractor = (cssLoaderOptions = {}, postCssLoaderOptions = {}) => ({
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        ...cssLoaderOptions
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          autoprefixer(),
        ],
        ...postCssLoaderOptions
      },
    },
  ],
});

if (isProduction) {
  module.exports = {
    mode: 'production',
    output: {
      filename: 'main.min.js',
      libraryTarget: 'commonjs2',
    },
    module: {
      rules: [
        eslintLoader,
        babelLoader,
        cssExtractor({sourceMap: true}, {sourceMap: true}),
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin({
          test: /\.css$/,
          sourceMap: true
        })
      ],
    },
    plugins: [
      new MiniCssExtractPlugin()
    ],
    externals: {
      'react': 'react',
      'react-dom': 'react-dom',
      'regenerator-runtime': 'regenerator-runtime',
      'prop-types': 'prop-types',
    },
  };
} else {
  module.exports = {
    mode: 'development',
    devtool: false,
    output: {
      libraryTarget: 'commonjs2',
      path: path.resolve(__dirname, 'build'),
    },
    module: {
      rules: [
        babelLoader,
        cssExtractor(),
      ],
    },
    optimization: {
      minimize: false,
    },
    plugins: [
      new MiniCssExtractPlugin({
        path: path.resolve(__dirname, 'build')
      })
    ],
    externals: {
      'react': 'react',
      'react-dom': 'react-dom',
      'regenerator-runtime': 'regenerator-runtime',
      'prop-types': 'prop-types',
    },
  };
}
