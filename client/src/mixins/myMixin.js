import JQuery from 'jquery'

const $ = JQuery

export default {
  methods: {
    preserveRatio() {
      const gridTemplateColumns = $('.grid').css('grid-template-columns')
      const width = gridTemplateColumns.split('px')[0]
      $('.grid').css({
        'grid-auto-rows': width + 'px'
      })
    },
  }
}
