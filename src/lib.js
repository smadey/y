export function isDefined (obj) {
  return typeof obj !== 'undefined'
}

export function isUndefined (obj) {
  return !isDefined(obj)
}

export function isBoolean (obj) {
  return typeof obj === 'boolean'
}

export function isNumber (obj) {
  return typeof obj === 'number'
}

export function isString (obj) {
  return typeof obj === 'string'
}

export function isArray (obj) {
  return Array.isArray(obj)
}

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function isFunction (obj) {
  return typeof obj === 'function'
}

export function isWindow (obj) {
  return obj != null && obj === obj.window
}

export function isArrayLike (obj) {
  if (isBoolean(obj) || isNumber(obj) || isFunction(obj) || isWindow(obj)) {
    return false
  }

  if (isString(obj) || isArray(obj)) {
    return true
  }

  let length = !!obj && 'length' in obj && obj.length
  return length === 0 || (typeof length === 'number' && length > 0 && (length - 1) in obj)
}

export function extend (obj, ...args) {
  if (!obj || !args.length) {
    return obj
  }

  args.forEach(source => {
    Object.keys(source).forEach(key => {
      obj[key] = source[key]
    })
  })

  return obj
}

export function each (obj, iterator, context) {
  if (obj) {
    let i
    let len

    if (isArrayLike(obj)) {
      for (i = 0, len = obj.length; i < len; i++) {
        iterator.call(context, obj[i], i, obj)
      }
    } else {
      let keys = Object.keys(obj)
      let key

      for (i = 0, len = keys.length; i < len; i++) {
        key = keys[i]
        iterator.call(context, obj[key], key, obj)
      }
    }
  }
}

export function throttle (func, wait) {
  let context
  let args
  let result
  let previous = 0
  let timer = null

  const later = () => {
    previous = Date.now()
    timer = null

    result = func.apply(context, args)

    if (!timer) {
      context = args = null
    }
  }

  return function () {
    context = this
    args = arguments

    let diff = Date.now() - previous

    if (diff >= wait || diff < 0) {
      clearTimeout(timer)
      later()
    } else if (!timer) {
      timer = setTimeout(later, wait - diff)
    }

    return result
  }
}

export function debounce (func, wait) {
  let context
  let args
  let result
  let previous
  let timer

  let later = () => {
    let diff = Date.now() - previous

    if (diff < wait && diff > 0) {
      timer = setTimeout(later, wait - diff)
    } else {
      timer = null
      result = func.apply(context, args)

      if (!timer) {
        context = args = null
      }
    }
  }

  return function () {
    context = this
    args = arguments

    previous = Date.now()

    if (!timer) {
      timer = setTimeout(later, wait)
    }

    return result
  }
}

export const asap = (function () {
  let callbacks = []
  let pending = false
  let timerFunc

  function handler () {
    pending = false
    for (let i = 0, n = callbacks.length; i < n; i++) {
      callbacks[i]()
    }
    callbacks = []
  }

  if (isDefined(MutationObserver)) {
    let counter = 1
    let observer = new MutationObserver(handler)
    let textNode = document.createTextNode(counter)

    observer.observe(textNode, {
      characterData: true
    })

    timerFunc = function () {
      counter = (counter + 1) % 2
      textNode.data = counter
    }
  } else {
    const context = isDefined(window) ? window : isDefined(global) ? global : {}
    timerFunc = context.setImmediate || setTimeout
  }

  return function (callback, context) {
    callbacks.push(context ? () => callback.call(context) : callback)

    if (pending) {
      return
    }

    pending = true
    timerFunc(handler, 0)
  }
})()
