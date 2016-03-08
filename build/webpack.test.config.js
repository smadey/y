var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './test/unit/specs/index.js',
  output: {
    path: path.resolve(__dirname, '../test/unit'),
    filename: 'specs.js'
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src')
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../test'),
          path.resolve(__dirname, '../build')
        ]
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../test'),
          path.resolve(__dirname, '../build')
        ],
        query: {
          presets: ['es2015', 'stage-2']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ],
  devServer: {
    contentBase: './test/unit',
    noInfo: true
  },
  devtool: 'source-map',
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
