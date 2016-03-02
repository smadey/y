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
      callback(this[i], i)
    }
    return this
  }

  on (type, fn, useCapture) {
    this.each(el => {
      if (el.addEventListener) {
        el.addEventListener(type, fn, !!useCapture)
      } else if (el.attachEvent) {
        el.attachEvent(type, fn)
      }
    })
  }

  off (type, fn, useCapture) {
    this.each(el => {
      if (el.removeEventListener) {
        el.removeEventListener(type, fn, !!useCapture)
      } else if (el.detachEvent) {
        el.detachEvent(type, fn)
      }
    })
  }

  once (type, fn, useCapture) {
    this.on(type, onceFn.bind(this), useCapture)

    function onceFn () {
      fn.apply(this, arguments)
      this.off(type, onceFn, useCapture)
    }
  }

  live (type, selector, fn, useCapture) {
    this.on(type, liveFn, useCapture)

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

  transitionEnd (el, callback) {
    const events = ['transitionend', 'webkitTransitionEnd',
      'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd']

    events.find(evt => {
      if (window['on' + evt.toLowerCase()] !== undefined) {
        this.once(evt, callback)
        return true
      }
    })
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
        left: rect.left + window.pageXOffset - docElem.clientLeft
      }
    }

    return rect
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

export default function (selector) {
  let dom

  if (!selector) {
    return new Dom()
  } else if (typeof selector === 'string') {
    dom = [...document.querySelectorAll(selector.trim())]
  } else if (selector instanceof Dom) {
    return selector
  } else {
    dom = [selector]
    selector = null
  }

  return new Dom(dom, selector)
}
