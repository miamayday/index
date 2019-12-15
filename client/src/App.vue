<template>
  <div id="app">
    <upload />
    <search />
    <gallery />
  </div>
</template>

<script>
import axios from 'axios'

import Search from '@/components/Search'
import Gallery from '@/components/Gallery'
import Upload from '@/components/Upload'

export default {
  name: 'app',
  components: { Search, Gallery, Upload },
  data() {
    return {
      windowWidth: 0,
      windowHeight: 0
      // tags: []
    }
  },
  mounted() {
    axios.get('http://localhost:8081/files').then(response => {
      this.$store.commit('initFiles', response.data)
      // this.tags = [...new Set(this.$store.getters.files.flatMap(f => f.tags))]
    })

    window.addEventListener('resize', this.getWindowWidth)
    window.addEventListener('resize', this.getWindowHeight)
  },
  methods: {
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth
    },
    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth)
    window.removeEventListener('resize', this.getWindowHeight)
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
