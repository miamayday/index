<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">index</router-link>
      <router-link to="/upload">upload</router-link>
    </div>
    <keep-alive include="index">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import axios from 'axios'
import JQuery from 'jquery'
import myMixin from '@/mixins/myMixin.js'

const $ = JQuery

export default {
  name: 'app',
  mixins: [myMixin],
  mounted() {
    axios.get('http://localhost:8081/files').then(response => {
      this.$store.commit('initFiles', response.data)
    })

    window.addEventListener('resize', this.onWindowResize)
  },
  watch: {
    $route(to, from) {
      // console.log('going to', to)
      // this.preserveRatio()
    }
  },
  methods: {
    onWindowResize(event) {
      this.preserveRatio()
    }
  },
  update() {
    this.preserveRatio()
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
#nav {
  margin: 50px 0;
  text-align: center;
}
#nav > * {
  margin-right: 20px;
  color: inherit;
  text-decoration: none;
}
</style>
