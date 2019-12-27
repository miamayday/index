import JQuery from 'jquery'

const $ = JQuery

export default {
  methods: {
    preserveRatio() {
      let gridTemplateColumns = $('.grid').css('grid-template-columns')
      let width = gridTemplateColumns.split('px')[0]
      let columns = gridTemplateColumns.split(' ').length
      // console.log('#columns:', columns)
      // $('.grid').css({
      //   'grid-auto-rows': width + 'px'
      // })
    },
    nofColumns() {
      let windowWidth = $(window).width()
      if (windowWidth < 1100) {
        return 3
      } else {
        let gridTemplateColumns = $('.grid').css('grid-template-columns')
        return gridTemplateColumns.split(' ').length
      }
    },
    fitPreview() {
      let container = $('.modal-container')
      if (container) {
        let containerHeight = container[0].clientHeight

        let bannerImg = $('.modal-banner img')
        let content = $('.modal-content')
        let contentHeight = content[0].clientHeight

        let Y = bannerImg[0].clientHeight
        let X = bannerImg[0].clientWidth
        let previewHeight = Y + contentHeight

        console.log(contentHeight)

        // preview exceeds its container
        if (previewHeight > containerHeight) {
          let y = containerHeight - contentHeight
          let x = (y * X) / Y
          // container.css({ 'max-width': x + 'px' })
        }

        // console.log(previewHeight, 'VS', containerHeight)
      }
    }
  }
}
