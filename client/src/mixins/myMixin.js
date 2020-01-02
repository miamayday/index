import JQuery from 'jquery'

const $ = JQuery

export default {
  methods: {
    nofColumns() {
      let windowWidth = $(window).width()
      let gridTemplateColumns = $('.grid').css('grid-template-columns')
      return gridTemplateColumns.split(' ').length
    }
  }
}
