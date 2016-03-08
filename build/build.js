var fs = require('fs')
var zlib = require('zlib')

var rollup = require('rollup')
var uglify = require('uglify-js')
var babel = require('rollup-plugin-babel')
var replace = require('rollup-plugin-replace')

var version = process.env.VERSION || require('../package.json').version

var banner =
  '/*!\n' +
  ' * y.js v' + version + '\n' +
  ' * (c) ' + new Date().getFullYear() + ' Smadey Zhang\n' +
  ' * Released under the MIT License.\n' +
  ' */'

// update main file
var main = fs
  .readFileSync('src/index.js', 'utf-8')
  .replace(/y\.version = '[\d\.]+'/, "y.version = '" + version + "'")
fs.writeFileSync('src/index.js', main)

// CommonJS build.
// this is used as the "main" field in package.json
// and used by bundlers like Webpack and Browserify.
rollup.rollup({
  entry: 'src/index.js',
  plugins: [
    babel({
      presets: ['es2015-rollup', 'stage-2']
    })
  ]
})
.then(function (bundle) {
  return write('dist/y.common.js', bundle.generate({
    format: 'cjs',
    banner: banner
  }).code)
})
// Standalone Dev Build
.then(function () {
  return rollup.rollup({
    entry: 'src/index.js',
    plugins: [
      replace({
        'process.env.NODE_ENV': "'development'"
      }),
      babel({
        presets: ['es2015-rollup', 'stage-2']
      })
    ]
  })
  .then(function (bundle) {
    return write('dist/y.js', bundle.generate({
      format: 'umd',
      banner: banner,
      moduleName: 'y'
    }).code)
  })
})
.then(function () {
  // Standalone Production Build
  return rollup.rollup({
    entry: 'src/index.js',
    plugins: [
      replace({
        'process.env.NODE_ENV': "'production'"
      }),
      babel({
        presets: ['es2015-rollup', 'stage-2']
      })
    ]
  })
  .then(function (bundle) {
    var code = bundle.generate({
      format: 'umd',
      moduleName: 'y'
    }).code
    var minified = banner + '\n' + uglify.minify(code, {
      fromString: true,
      output: {
        ascii_only: true
      }
    }).code
    return write('dist/y.min.js', minified)
  })
  .then(zip)
})
.catch(logError)

function write (dest, code) {
  /* eslint no-undef:0 */
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err)
      console.log(blue(dest) + ' ' + getSize(code))
      resolve()
    })
  })
}

function zip () {
  /* eslint no-undef:0 */
  return new Promise(function (resolve, reject) {
    fs.readFile('dist/y.min.js', function (err, buf) {
      if (err) return reject(err)
      zlib.gzip(buf, function (err, buf) {
        if (err) return reject(err)
        write('dist/y.min.js.gz', buf).then(resolve)
      })
    })
  })
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function logError (e) {
  console.log(e)
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
