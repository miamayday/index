<template>
  <div id="app">
    <upload />
    <search />
    <gallery :searcher="searcher" />
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
      searcher: {
        // 1. cause of error after changes
        jpeg: require.context('./../../data/uploads/img', false, /\.jpeg$/),
        jpg: require.context('./../../data/uploads/img', false, /\.jpg$/),
        png: require.context('./../../data/uploads/img', false, /\.png$/),
        webp: require.context('./../../data/uploads/img', false, /\.webp$/),
        mp4: require.context('./../../data/uploads/vid', false, /\.mp4$/),
        gif: require.context('./../../data/uploads/img', false, /\.gif$/),
        webm: require.context('./../../data/uploads/vid', false, /\.webm$/)
      }
      // tags: []
    }
  },
  mounted() {
    axios.get('http://localhost:8081/files').then(response => {
      this.$store.commit('initFiles', response.data)
      // this.tags = [...new Set(this.$store.getters.files.flatMap(f => f.tags))]
    })
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
