import * as _ from 'src/lib'

describe('lib', () => {

  describe('lib.isDefined', () => {
    it('should return true if passed null|window or a(n) boolean|number|string|array|object|function|HTMLElement', () => {
      expect(_.isDefined(null)).toBe(true)
      expect(_.isDefined(window)).toBe(true)

      expect(_.isDefined(false)).toBe(true)
      expect(_.isDefined(0)).toBe(true)
      expect(_.isDefined('')).toBe(true)
      expect(_.isDefined([])).toBe(true)
      expect(_.isDefined({})).toBe(true)
      expect(_.isDefined(function () {})).toBe(true)
      expect(_.isDefined(document.createElement('div'))).toBe(true)
    })

    it('should return false if passed a undefined', () => {
      expect(_.isDefined()).toBe(false)
    })
  })

  describe('lib.isUndefined', () => {
    it('should return true if passed a undefined', () => {
      expect(_.isUndefined()).toBe(true)
    })

    it('should return false if passed null|window or a(n) boolean|number|string|array|object|function|HTMLElement', () => {
      expect(_.isUndefined(null)).toBe(false)
      expect(_.isUndefined(window)).toBe(false)

      expect(_.isUndefined(false)).toBe(false)
      expect(_.isUndefined(0)).toBe(false)
      expect(_.isUndefined('')).toBe(false)
      expect(_.isUndefined([])).toBe(false)
      expect(_.isUndefined({})).toBe(false)
      expect(_.isUndefined(function () {})).toBe(false)
      expect(_.isUndefined(document.createElement('div'))).toBe(false)
    })
  })

  describe('lib.isBoolean', () => {
    it('should return true if passed a boolean', () => {
      expect(_.isBoolean(true)).toBe(true)
      expect(_.isBoolean(false)).toBe(true)
    })

    it('should return false if passed null|undefined|window or a(n) number|string|array|object|function|HTMLElement', () => {
      expect(_.isBoolean(null)).toBe(false)
      expect(_.isBoolean()).toBe(false)
      expect(_.isBoolean(window)).toBe(false)

      expect(_.isBoolean(0)).toBe(false)
      expect(_.isBoolean('')).toBe(false)
      expect(_.isBoolean([])).toBe(false)
      expect(_.isBoolean({})).toBe(false)
      expect(_.isBoolean(function () {})).toBe(false)
      expect(_.isBoolean(document.createElement('div'))).toBe(false)
    })
  })

  describe('lib.isNumber', () => {
    it('should return true if passed NaN or a number', () => {
      expect(_.isNumber(0)).toBe(true)
      expect(_.isNumber(NaN)).toBe(true)
    })

    it('should return false if passed null|undefined|window or a(n) boolean|string|array|object|function|HTMLElement', () => {
      expect(_.isNumber(null)).toBe(false)
      expect(_.isNumber()).toBe(false)
      expect(_.isNumber(window)).toBe(false)

      expect(_.isNumber(false)).toBe(false)
      expect(_.isNumber('')).toBe(false)
      expect(_.isNumber([])).toBe(false)
      expect(_.isNumber({})).toBe(false)
      expect(_.isNumber(function () {})).toBe(false)
      expect(_.isNumber(document.createElement('div'))).toBe(false)
    })
  })

  describe('lib.isObject', () => {
    it('should return true if passed window or a(n) array|function|HTMLElement', () => {
      expect(_.isObject(window)).toBe(true)

      expect(_.isObject([])).toBe(true)
      expect(_.isObject({})).toBe(true)
      expect(_.isObject(document.createElement('div'))).toBe(true)
    })

    it('should return false if passed null|undefined|window or a(n) boolean|number|string|function|HTMLElement', () => {
      expect(_.isObject(null)).toBe(false)
      expect(_.isObject()).toBe(false)

      expect(_.isObject(false)).toBe(false)
      expect(_.isObject(0)).toBe(false)
      expect(_.isObject('')).toBe(false)
      expect(_.isObject(function () {})).toBe(false)
    })
  })

  describe('lib.isFunction', () => {
    it('should return true if passed a function', () => {
      expect(_.isFunction(function () {})).toBe(true)
    })

    it('should return false if passed null|undefined|window or a(n) boolean|number|string|array|object|HTMLElement', () => {
      expect(_.isFunction(null)).toBe(false)
      expect(_.isFunction()).toBe(false)
      expect(_.isFunction(window)).toBe(false)

      expect(_.isFunction(false)).toBe(false)
      expect(_.isFunction(0)).toBe(false)
      expect(_.isFunction('')).toBe(false)
      expect(_.isFunction([])).toBe(false)
      expect(_.isFunction({})).toBe(false)
      expect(_.isFunction(document.createElement('div'))).toBe(false)
    })
  })

  describe('lib.isWindow', () => {
    it('should return true if passed window', () => {
      expect(_.isWindow(window)).toBe(true)
    })

    it('should return false if passed null|undefined or a(n) boolean|number|string|array|object|function|HTMLElement', () => {
      expect(_.isWindow(null)).toBe(false)
      expect(_.isWindow()).toBe(false)

      expect(_.isWindow(false)).toBe(false)
      expect(_.isWindow(0)).toBe(false)
      expect(_.isWindow('')).toBe(false)
      expect(_.isWindow([])).toBe(false)
      expect(_.isWindow({})).toBe(false)
      expect(_.isWindow(document.createElement('div'))).toBe(false)
    })
  })

  describe('lib.isArrayLike', () => {

    it('should return false if passed null|undefined|window or a(n) boolean|number|function', () => {
      expect(_.isArrayLike(null)).toBe(false)
      expect(_.isArrayLike()).toBe(false)
      expect(_.isArrayLike(window)).toBe(false)

      expect(_.isArrayLike(true)).toBe(false)
      expect(_.isArrayLike(10)).toBe(false)
      expect(_.isArrayLike(function () {})).toBe(false)
    })

    it('should return true if passed a(n) string|array', () => {
      expect(_.isArrayLike('foo')).toBe(true)
    })

    it('should return true if passed arguments object', () => {
      function test (a, b, c) {
        expect(_.isArrayLike(arguments)).toBe(true)
      }

      test(1, 2, 3)
    })

    it('should return true if passed a nodelist', () => {
      var nodes1 = document.body.childNodes
      expect(_.isArrayLike(nodes1)).toBe(true)

      var nodes2 = document.getElementsByTagName('nonExistingTagName')
      expect(_.isArrayLike(nodes2)).toBe(true)
    })

    it('should return false if passed a object without length', () => {
      expect(_.isArrayLike({foo: 'fooVal'})).toBe(false)
    })

    it('should return false if passed a object with length', () => {
      expect(_.isArrayLike({foo: 'fooVal', length: 2})).toBe(false)
    })

    it('should return true for empty instances of an Array subclass', () => {
      function ArrayLike () {}
      ArrayLike.prototype = Array.prototype

      var arrLike = new ArrayLike()
      expect(arrLike.length).toBe(0)
      expect(_.isArrayLike(arrLike)).toBe(true)

      arrLike.push(1, 2, 3)
      expect(arrLike.length).toBe(3)
      expect(_.isArrayLike(arrLike)).toBe(true)
    })
  })

  describe('lib.extend', () => {
    it('should return self if passed one arguments', () => {
      dest = null
      ext = _.extend(dest)
      expect(ext).toBe(null)

      let dest = {}
      let ext = _.extend(dest)
      expect(ext).toBe(dest)
    })

    it('should copy the properties of the source object onto the destination object', () => {
      let dest = {}
      let src = {radius: 30, length: 0}

      _.extend(dest, src)

      expect(dest.radius).toBe(30)
      expect(dest.length).toBe(0)
    })

    it('should work when extending with itself', () => {
      let dest = {}
      let src = {radius: 30, length: 0}

      let ext = _.extend(dest, src)

      expect(ext).toBe(dest)
    })

    it('should copy dates by reference', () => {
      let dst = {}
      let src = {date: new Date()}

      _.extend(dst, src)

      expect(dst.date).toBe(src.date)
    })
  })

  describe('lib.each', () => {
    it('should iterate over *own* object properties', () => {
      function MyObj () {
        this.bar = 'barVal'
        this.baz = 'bazVal'
      }

      MyObj.prototype.foo = 'fooVal'

      let obj = new MyObj()
      let log = []

      _.each(obj, (value, key) => {
        log.push(key + ':' + value)
      })

      expect(log).toEqual(['bar:barVal', 'baz:bazVal'])
    })

    it('should not break if obj is an array we override hasOwnProperty', () => {
      let obj = []
      obj[0] = 1
      obj[1] = 2
      obj.hasOwnProperty = null

      let log = []

      _.each(obj, (value, key) => {
        log.push(key + ':' + value)
      })

      expect(log).toEqual(['0:1', '1:2'])
    })

    it('should handle JQLite and jQuery objects like arrays', () => {
      let $el = $('<p><span>s1</span><span>s2</span></p>').find('span')
      let log = []

      _.each($el, (value, key) => {
        log.push(key + ':' + value.innerHTML)
      })
      expect(log).toEqual(['0:s1', '1:s2'])

      log = []
      $el = $('<pane></pane>')

      _.each($el.children(), (value, key) => {
        log.push(key + ':' + value.innerHTML)
      })
      expect(log).toEqual([])
    })

    it('should handle NodeList objects like arrays', () => {
      let nodeList = $('<p><span>a</span><span>b</span><span>c</span></p>')[0].childNodes
      let log = []

      _.each(nodeList, (value, key) => {
        log.push(key + ':' + value.innerHTML)
      })
      expect(log).toEqual(['0:a', '1:b', '2:c'])
    })

    it('should handle HTMLCollection objects like arrays', () => {
      let div = document.createElement('div')
      div.style.display = 'none'
      div.innerHTML = '<p><a name="x">a</a><a name="y">b</a><a name="x">c</a></p>'
      document.body.appendChild(div)

      let htmlCollection = document.getElementsByName('x')
      let log = []

      _.each(htmlCollection, (value, key) => {
        log.push(key + ':' + value.innerHTML)
      })
      expect(log).toEqual(['0:a', '1:c'])

      document.body.removeChild(div)
    })

    if (document.querySelectorAll) {
      it('should handle the result of querySelectorAll in IE8 as it has no hasOwnProperty function', () => {
        let div = document.createElement('div')
        div.style.display = 'none'
        div.innerHTML = '<p><a name="x">a</a><a name="y">b</a><a name="x">c</a></p>'

        let htmlCollection = div.querySelectorAll('[name="x"]')
        let log = []

        _.each(htmlCollection, (value, key) => {
          log.push(key + ':' + value.innerHTML)
        })
        expect(log).toEqual(['0:a', '1:c'])
      })
    }

    it('should handle arguments objects like arrays', () => {
      let args = (function () {
        return arguments
      })('a', 'b', 'c')
      let log = []

      _.each(args, (value, key) => {
        log.push(key + ':' + value)
      })
      expect(log).toEqual(['0:a', '1:b', '2:c'])
    })

    it('should handle string values like arrays', () => {
      let log = []

      _.each('bar', (value, key) => {
        log.push(key + ':' + value)
      })
      expect(log).toEqual(['0:b', '1:a', '2:r'])
    })

    it('should handle objects with length property as objects', () => {
      let obj = {foo: 'bar', length: 2}
      let log = []

      _.each(obj, (value, key) => {
        log.push(key + ':' + value)
      })
      expect(log).toEqual(['foo:bar', 'length:2'])
    })

    it('should handle objects of custom types with length property as objects', function () {
      function CustomType () {
        this.length = 2
        this.foo = 'bar'
      }

      let obj = new CustomType()
      let log = []

      _.each(obj, (value, key) => {
        log.push(key + ':' + value)
      })
      expect(log).toEqual(['length:2', 'foo:bar'])
    })

    it('should invoke the iterator for indexed properties which are not present in the collection', function () {
      let log = []
      let collection = []
      collection[5] = 'SPARSE'

      _.each(collection, (item, index) => {
        log.push(index + ':' + item)
      })
      expect(log.length).toBe(6)
      expect(log[0]).toEqual('0:undefined')
    })

    it('should safely iterate through objects with no prototype parent', function () {
      let obj = _.extend(Object.create(null), {
        a: 1, b: 2, c: 3
      })

      let log = []
      let self = {}

      _.each(obj, function (val, key, collection) {
        expect(this).toBe(self)
        expect(collection).toBe(obj)
        log.push(key + '=' + val)
      }, self)

      expect(log.length).toBe(3)
      expect(log).toEqual(['a=1', 'b=2', 'c=3'])
    })

    it('should safely iterate through objects which shadow Object.prototype.hasOwnProperty', function () {
      let obj = {hasOwnProperty: true, a: 1, b: 2, c: 3}
      let log = []
      let self = {}

      _.each(obj, function (val, key, collection) {
        expect(this).toBe(self)
        expect(collection).toBe(obj)
        log.push(key + '=' + val)
      }, self)

      expect(log.length).toBe(4)
      expect(log).toEqual(['hasOwnProperty=true', 'a=1', 'b=2', 'c=3'])
    })

    describe('ES spec api compliance', () => {

      function testEachSpec (expectedSize, collection) {
        let that = {}

        _.each(collection, function (value, key, collectionArg) {
          expect(collectionArg).toBe(collection)
          expect(collectionArg[key]).toBe(value)

          expect(this).toBe(that)

          expectedSize--
        }, that)

        expect(expectedSize).toBe(0)
      }

      it('should follow the ES spec when called with array', () => {
        testEachSpec(2, [1, 2])
      })

      it('should follow the ES spec when called with arguments', () => {
        testEachSpec(2, (function () {
          return arguments
        })(1, 2))
      })

      it('should follow the ES spec when called with string', () => {
        testEachSpec(2, '12')
      })

      it('should follow the ES spec when called with jQuery/jqLite', () => {
        testEachSpec(2, $('<span>a</span><span>b</span>'))
      })

      it('should follow the ES spec when called with childNodes NodeList', () => {
        testEachSpec(2, $('<p><span>a</span><span>b</span></p>')[0].childNodes)
      })

      it('should follow the ES spec when called with getElementsByTagName HTMLCollection', () => {
        testEachSpec(2, $('<p><span>a</span><span>b</span></p>')[0].getElementsByTagName('*'))
      })

      it('should follow the ES spec when called with querySelectorAll HTMLCollection', () => {
        testEachSpec(2, $('<p><span>a</span><span>b</span></p>')[0].querySelectorAll('*'))
      })

      it('should follow the ES spec when called with JSON', () => {
        testEachSpec(2, {a: 1, b: 2})
      })

      it('should follow the ES spec when called with function', () => {
        function f () {}
        f.a = 1
        f.b = 2
        testEachSpec(2, f)
      })
    })
  })

  describe('lib.throttle', () => {
    it('should enforces a maximum number of times a function can be called over time', done => {
      let count = 0
      let fn = _.throttle(() => count++, 100)

      fn()
      setTimeout(fn, 10)
      setTimeout(fn, 20)
      setTimeout(() => expect(count).toBe(1), 50)
      setTimeout(() => {
        expect(count).toBe(2)
        done()
      }, 200)
    })
  })

  describe('lib.debounce', () => {
    it('should enforces that a function not be called again until a certain amount of time has passed without it being called', done => {
      let count = 0
      let fn = _.debounce(() => count++, 100)

      fn()
      setTimeout(fn, 10)
      setTimeout(fn, 20)
      setTimeout(() => expect(count).toBe(0), 50)
      setTimeout(() => {
        expect(count).toBe(1)
        done()
      }, 200)
    })
  })

  describe('lib.asap', () => {
    it('should executed not direct but as soon as possible', done => {
      let counter = 0
      let fn = () => counter++

      _.asap(fn)

      setTimeout(() => {
        expect(counter).toBe(1)
        done()
      }, 0)

      expect(counter).toBe(0)
    })

    it('should accept context', done => {
      var ctx = {}

      _.asap(function () {
        this.id = 1
      }, ctx)

      _.asap(() => {
        expect(ctx.id).toBe(1)
        done()
      })
    })

  })

})
