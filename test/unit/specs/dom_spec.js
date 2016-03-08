import * as _ from 'src/lib'
import $ from 'src/dom'

describe('dom', () => {

  it('should return object and have length and selector property', () => {
    let $div = $('div')

    expect($div instanceof $.class).toBe(true)
    expect(_.isDefined($div.length)).toBe(true)
    expect(_.isDefined($div.selector)).toBe(true)
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
