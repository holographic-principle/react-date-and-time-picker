// https://v1.dhruvkumarjha.com/articles/introduction-to-creating-react-components-and-publishing-them-to-npm
// https://www.valentinog.com/blog/webpack-4-tutorial/
// https://github.com/webpack/docs/wiki/configuration

const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
const urlLoader = {
  test: [/\.svg$/],
  loader: 'url-loader',
  options: {
    limit: 10000,
  },
};
const cssExtractor = options => ({
  test: /\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options,
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
      },
    },
  ],
});

module.exports = [];

const baseConfig = {
  output: {
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      babelLoader,
      urlLoader,
      cssExtractor({
        importLoaders: true,
      }),
    ],
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new ExtractTextPlugin('main.css'),
  ]
};

module.exports.push(baseConfig);

if (isProduction) {
  baseConfig.module.rules.unshift(eslintLoader);
  Object.assign(baseConfig, {
    externals: {
      'react': 'react',
      'react-dom': 'react-dom',
      'regenerator-runtime': 'regenerator-runtime',
      'prop-types': 'prop-types',
    },
  });
  module.exports.push(Object.assign({}, baseConfig, {
    output: {
      filename: 'main.min.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'commonjs2',
    },
    optimization: {
      minimize: true,
    },
    module: {
      rules: [
        eslintLoader,
        babelLoader,
        urlLoader,
        cssExtractor({
          importLoaders: true,
        }),
      ],
    },
    plugins: [
      new ExtractTextPlugin('main.min.css'),
    ]
  }));
}
