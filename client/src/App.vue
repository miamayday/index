<template>
  <div id="app">
    <upload />
    <search />
    <gallery />
  </div>
</template>

<script>
import axios from 'axios'
import JQuery from 'jquery'

import Search from '@/components/Search'
import Gallery from '@/components/Gallery'
import Upload from '@/components/Upload'

const $ = JQuery

export default {
  name: 'app',
  components: { Search, Gallery, Upload },
  mounted() {
    axios.get('http://localhost:8081/files').then(response => {
      this.$store.commit('initFiles', response.data)
    })

    window.addEventListener('resize', this.onWindowResize)
    this.preserveRatio()
  },
  methods: {
    preserveRatio() {
      const gridTemplateColumns = $('.grid').css('grid-template-columns')
      const width = gridTemplateColumns.split('px')[0]
      $('.grid').css({
        'grid-auto-rows': width + 'px'
      })
    },
    onWindowResize(event) {
      this.preserveRatio()
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');

html {
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
}
</style>
