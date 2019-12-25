import JQuery from 'jquery'

const $ = JQuery

export default {
  methods: {
    preserveRatio() {
      const gridTemplateColumns = $('.grid').css('grid-template-columns')
      const width = gridTemplateColumns.split('px')[0]
      const columns = gridTemplateColumns.split(' ').length
      // console.log('#columns:', columns)
      // $('.grid').css({
      //   'grid-auto-rows': width + 'px'
      // })
    },
    nofColumns() {
      const windowWidth = $(window).width()
      if (windowWidth < 1100) {
        return 3
      } else {
        const gridTemplateColumns = $('.grid').css('grid-template-columns')
        return gridTemplateColumns.split(' ').length
      }
    }
  }
}
