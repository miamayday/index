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
