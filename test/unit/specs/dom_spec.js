import * as _ from 'src/lib'
import $ from 'src/dom'

describe('dom', () => {

  it('should return object and have length and selector property', () => {
    let $div = $('div')

    expect($div instanceof $.class).toBe(true)
    expect(_.isDefined($div.length)).toBe(true)
    expect(_.isDefined($div.selector)).toBe(true)
  })

  describe('Dom.prototype.each', () => {
    it('should cycle every element', () => {
      let divs = document.querySelectorAll('div')
      let $div = $('div')

      $div.each(function (el, i) {
        expect(this).toBe(el)
        expect(this).toBe(divs[i])
      })
    })
  })

  describe('Dom.prototype.eq', () => {
    it('should get the element at specified index', () => {
      let div = document.createElement('div')
      document.body.appendChild(div)

      expect($('div').eq(-1)[0]).toBe(div)

      document.body.removeChild(div)
    })
  })

  describe('Dom.prototype.height', () => {
    it('should get the number of height', () => {
      let div = document.createElement('div')
      div.style.height = '100px'
      document.body.appendChild(div)

      expect($('div').eq(-1).height()).toBe(100)

      expect($(window).height()).toBe(window.innerHeight)
      expect($(document).height()).toBe(document.documentElement.scrollHeight)

      document.body.removeChild(div)
    })

    it('should set the height if passed a value', () => {
      let div = document.createElement('div')
      document.body.appendChild(div)

      let $div = $('div').eq(-1)

      $div.height(100)
      expect($div.height()).toBe(100)

      document.body.removeChild(div)
    })
  })

  describe('Dom.prototype.width', () => {
    it('should get the number of width', () => {
      let div = document.createElement('div')
      div.style.width = '100px'
      document.body.appendChild(div)

      expect($('div').eq(-1).width()).toBe(100)

      expect($(window).width()).toBe(window.innerWidth)
      expect($(document).width()).toBe(document.documentElement.scrollWidth)

      document.body.removeChild(div)
    })

    it('should set the width if passed a value', () => {
      let div = document.createElement('div')
      document.body.appendChild(div)

      let $div = $('div').eq(-1)

      $div.width(100)
      expect($div.width()).toBe(100)

      document.body.removeChild(div)
    })
  })

  describe('Dom.prototype.once', () => {
    it('should trigger only once', (done) => {
      let counter = 1

      $(window).once('scroll', () => {
        counter--
      })

      $(window).trigger('scroll')
      expect(counter).toBe(0)

      setTimeout(() => {
        $(window).trigger('scroll')
        expect(counter).toBe(0)
        done()
      }, 200)
    })
  })

})
