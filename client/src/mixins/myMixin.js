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
      const gridTemplateColumns = $('.grid').css('grid-template-columns')
      return gridTemplateColumns.split(' ').length
    }
  }
}
