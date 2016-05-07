import * as _ from './lib'

const numberStyles = ['column-count', 'columns', 'font-weight', 'line-height', 'opacity', 'z-index', 'zoom']

class Dom {
  constructor (dom, selector) {
    let len = dom ? dom.length : 0

    for (let i = 0; i < len; i++) {
      this[i] = dom[i]
    }

    this.length = len
    this.selector = selector || ''
  }

  each (callback) {
    for (let i = 0, n = this.length; i < n; i++) {
      callback.call(this[i], this[i], i)
    }
    return this
  }

  eq (index) {
    index = index < 0 ? index + this.length : index > 0 ? index : 0
    return dom(this[index])
  }

  height (value) {
    if (value === undefined) {
      let el = this[0]

      if (_.isWindow(el)) {
        return el.innerHeight
      } else if (_.isDocument(el)) {
        return el.documentElement.scrollHeight
      }
      return this.offset().height
    }

    return this.css('height', value)
  }

  width (value) {
    if (value === undefined) {
      let el = this[0]

      if (_.isWindow(el)) {
        return el.innerWidth
      } else if (_.isDocument(el)) {
        return el.documentElement.scrollWidth
      }
      return this.offset().width
    }

    return this.css('width', value)
  }

  scrollTop (value) {
    let el = this[0]

    if (!el) {
      return
    }

    let hasScrollTop = 'scrollTop' in el

    if (value === undefined) {
      return hasScrollTop ? el.scrollTop : el.pageYOffset
    }

    let eachFn = hasScrollTop
      ? el => {el.scrollTop = value}
      : el => el.scrollTo(el.scrollX, value)

    return this.each(eachFn)
  }

  scrollLeft (value) {
    let el = this[0]

    if (!el) {
      return
    }

    let hasScrollLeft = 'scrollLeft' in el

    if (value === undefined) {
      return hasScrollLeft ? el.scrollLeft : el.pageXOffset
    }

    let eachFn = hasScrollLeft
      ? el => {el.scrollTop = value}
      : el => el.scrollTo(value, el.scrollY)

    return this.each(eachFn)
  }

  transform (transform) {
    this.each(el => {
      let elStyle = el.style

      elStyle.webkitTransform =
        elStyle.MsTransform =
        elStyle.msTransform =
        elStyle.MozTransform =
        elStyle.OTransform =
        elStyle.transform = transform
    })
  }

  transition (duration) {
    if (typeof duration !== 'string') {
      duration = duration + 'ms'
    }

    this.each(el => {
      let elStyle = el.style

      elStyle.webkitTransitionDuration =
        elStyle.MsTransitionDuration =
        elStyle.msTransitionDuration =
        elStyle.MozTransitionDuration =
        elStyle.OTransitionDuration =
        elStyle.transitionDuration = duration
    })
  }

  css (property, value) {
    let css = ''

    if (_.isObject(property, true)) {
      for (let key in property) {
        if (isEmptyCssValue(property[key])) {
          this.each(el => el.style.removeProperty(key))
        } else {
          css += key + ':' + maybeAddPx(key, property[key]) + ';'
        }
      }

      return this.each(el => {
        el.style.cssText += ';' + css
      })
    }

    if (value === undefined) {
      let el = this[0]

      if (el) {
        let computedStyle = getComputedStyle(el, '')

        if (typeof property === 'string') {
          return el.style[_.toCamelCase(property)] || computedStyle.getPropertyValue(property)
        } else if (Array.isArray(property)) {
          let props = {}

          _.each(property, prop => {
            props = el.style[_.toCamelCase(prop)] || computedStyle.getPropertyValue(prop)
          })

          return props
        }
      }

      return
    }

    if (typeof property === 'string') {
      if (isEmptyCssValue(value)) {
        return this.each(el => el.style.removeProperty(property))
      }

      return this.each(el => {
        el.style[_.toCamelCase(property)] = maybeAddPx(property, value)
      })
    }

    return this

    function isEmptyCssValue (value) {
      return !value && value !== 0
    }

    function maybeAddPx (name, value) {
      return (typeof value === 'number' && numberStyles.indexOf(name) < 0) ? value + 'px' : value
    }
  }

  offset () {
    let el = this[0]

    if (!el) {
      return {}
    }

    let rect = el.getBoundingClientRect()

    if (rect.width || rect.height) {
      let docElem = el.ownerDocument.documentElement

      return {
        top: rect.top + window.pageYOffset - docElem.clientTop,
        left: rect.left + window.pageXOffset - docElem.clientLeft,
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      }
    }

    return rect
  }

  on (type, fn, useCapture) {
    return this.each(el => {
      if (el.addEventListener) {
        el.addEventListener(type, fn, !!useCapture)
      }
    })
  }

  off (type, fn, useCapture) {
    return this.each(el => {
      if (el.removeEventListener) {
        el.removeEventListener(type, fn, !!useCapture)
      }
    })
  }

  once (type, fn, useCapture) {
    let self = this
    return this.on(type, onceFn, !!useCapture)

    function onceFn () {
      self.off(type, onceFn, !!useCapture)
      fn.apply(this, arguments)
    }
  }

  live (type, selector, fn, useCapture) {
    return this.on(type, liveFn, !!useCapture)

    function liveFn (evt) {
      var cur = evt.target

      if (!cur.nodeType) {
        return
      }

      while (cur !== this) {
        if (cur.nodeType === 1 && cur.disabled !== true) {
          let els = this.querySelectorAll(selector)

          for (let i = 0, n = els.length; i < n; i++) {
            if (els[i] === cur) {
              fn.call(els[i], evt)
              return
            }
          }
        }

        cur = cur.parentNode || this
      }
    }
  }

  trigger (type, args) {
    let isDirectlyEvent = type === 'focus' || type === 'blur'

    let event = document.createEvent('Events')
    let bubbles = true

    event.initEvent(type, bubbles, true)

    return this.each(el => {
      if (isDirectlyEvent && typeof el[event.type] === 'function') {
        el[event.type]()
      } else if ('dispatchEvent' in el) {
        el.dispatchEvent(event)
      }
    })
  }

  transitionEnd (callback) {
    const events = ['transitionend', 'webkitTransitionEnd',
      'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd']

    events.find(evt => {
      if (window['on' + evt.toLowerCase()] !== undefined) {
        this.once(evt, callback)
        return true
      }
    })
  }

  isInViewport (threshold) {
    let el = this[0]

    if (!el) {
      return false
    }

    let rect = el.getBoundingClientRect()

    let winHeight = window.innerHeight || document.documentElement.clientHeight
    let winWidth = window.innerWidth || document.documentElement.clientWidth

    let isTopOfScreen = rect.bottom < -threshold
    let isRightOfScreen = rect.left > winWidth + threshold
    let isBottomOfScreen = rect.top > winHeight + threshold
    let isLeftOfScreen = rect.right < -threshold

    return !isTopOfScreen && !isRightOfScreen && !isBottomOfScreen && !isLeftOfScreen
  }
}

export default function dom (selector) {
  let dom

  if (!selector) {
    return new Dom()
  } else if (typeof selector === 'string') {
    dom = document.querySelectorAll(selector.trim())
  } else if (selector instanceof Dom) {
    return selector
  } else {
    dom = [selector]
    selector = null
  }

  return new Dom(dom, selector)
}

dom.class = Dom
