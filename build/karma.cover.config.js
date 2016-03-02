var assign = require('object-assign')
var base = require('./karma.base.config.js')

process.env.PHANTOMJS_BIN = 'node_modules/karma-phantomjs-launcher/node_modules/.bin/phantomjs'

module.exports = function (config) {
  var options = assign(base, {
    browsers: ['PhantomJS'],
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'lcov', dir: '../coverage', subdir: '.' },
        { type: 'text-summary', dir: '../coverage', subdir: '.' }
      ]
    }
  })

  // add coverage post loader
  options.webpack.module.postLoaders = [
    {
      test: /\.js$/,
      exclude: /test|node_modules/,
      loader: 'istanbul-instrumenter'
    }
  ]

  config.set(options)
}
