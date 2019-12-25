<template>
  <div id="app">
    <div
      id="nav"
      class="flex-center"
    >
      <router-link to="/">index</router-link>
      <router-link to="/upload">upload</router-link>
      <toggle-button
        titleA="dark mode"
        titleB="light mode"
        :onClickA="toggleDark"
        :onClickB="toggleLight"
      />
    </div>
    <keep-alive include="index">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import axios from 'axios'
import JQuery from 'jquery'
import myMixin from '@/mixins/myMixin'
import ToggleButton from '@/components/ToggleButton'

const $ = JQuery

export default {
  name: 'app',
  mixins: [myMixin],
  components: { ToggleButton },
  data() {
    return {
      darkMode: false
    }
  },
  mounted() {
    axios.get('http://localhost:8081/files').then(response => {
      this.$store.commit('initFiles', response.data)
    })

    window.addEventListener('click', this.onClick)
  },
  methods: {
    onClick(event) {
      let playingVideo = this.$store.getters.playingVideo
      if (playingVideo && event.target.id !== playingVideo.id) {
        playingVideo.pause()
        this.$store.commit('setPlayingVideo', null)
      }
    },
    toggleDark() {
      $('body').css({ 'background-color': '#121212' })
      $('body').css({ color: '#A9A9A9' })
      $('input').css({ 'background-color': '#121212' })
      $('input').css({ 'border-color': '#353535' })
      $('input').css({ 'color': '#A9A9A9' })
    },
    toggleLight() {
      $('body').css({ 'background-color': 'inherit' })
      $('body').css({ color: 'inherit' })
      $('input').css({ 'background-color': 'inherit' })
      $('input').css({ 'border-color': '#DFDFDF' })
      $('input').css({ 'color': 'inherit' })
    }
  },
  beforeDestroy() {
    window.removeEventListener('click', this.onClick)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');

html {
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
}
input {
  padding: 10px;
  border: 1px solid #DFDFDF;
  border-radius: 5px;
}
#nav {
  margin: 50px 0;
}
#nav > * {
  margin: 10px;
  text-decoration: none;
}
#nav > a {
  color: inherit;
}
#nav > *:focus {
  outline: none;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
