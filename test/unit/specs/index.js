let scope = typeof window === 'undefined' ? global : window

scope.process = {
  env: {
    NODE_ENV: 'development'
  }
}

// require all test files
let testsContext = require.context('.', true, /_spec$/)

testsContext.keys().forEach(testsContext)
