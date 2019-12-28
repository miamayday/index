<template>
  <div
    id="app"
    class="theme-light"
  >
    <div
      id="nav"
      class="flex-center"
    >
      <router-link to="/">index</router-link>
      <router-link to="/upload">upload</router-link>
      <v-button :onClick="toggleMode">{{ this.mode }}</v-button>
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
import Button from '@/components/Button'

const $ = JQuery

export default {
  name: 'app',
  mixins: [myMixin],
  components: { 'v-button': Button },
  data() {
    return {
      mode: 'dark mode'
    }
  },
  mounted() {
    // config
    if (localStorage.getItem('index-theme') === 'theme-dark') {
      $('#app').toggleClass('theme-light theme-dark')
      this.mode = 'light mode'
    }

    // fetch files
    axios.get('http://localhost:8081/files').then(response => {
      this.$store.commit('initFiles', response.data)
    })

    // listeners
    window.addEventListener('click', this.onClick)
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    onClick(event) {
      let playingVideo = this.$store.getters.playingVideo
      if (playingVideo && event.target.id !== playingVideo.id) {
        playingVideo.pause()
        this.$store.commit('setPlayingVideo', null)
      }
    },
    onMouseMove(event) {
      let x = event.clientX
      let y = event.clientY
      this.$store.commit('setMousePos', { x, y })
    },
    onResize(event) {
      // this.fitPreview()
    },
    toggleMode() {
      if (this.mode === 'dark mode') {
        $('#app').toggleClass('theme-light theme-dark')
        localStorage.setItem('index-theme', 'theme-dark')
        this.mode = 'light mode'
      } else {
        $('#app').toggleClass('theme-dark theme-light')
        localStorage.setItem('index-theme', 'theme-light')
        this.mode = 'dark mode'
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('click', this.onClick)
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('resize', this.onMouseMove)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
html {
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
}
a {
  text-decoration: none;
}
a:focus {
  outline: none;
}
.theme-light {
  --color-primary: #8075e0;
  --color-secondary: #ffffff;
  --color-accent: #e68494;
  --font-color: #3f3f3f;
  --border-color: #cacaca;
}
.theme-dark {
  --color-primary: #41ad7f;
  --color-secondary: #121212;
  --color-accent: #3393a1;
  --font-color: #a9a9a9;
  --border-color: #363636;
}
#app {
  width: 100%;
  height: 100%;
  background: var(--color-secondary);
  color: var(--font-color);
}
input {
  background: var(--color-secondary);
  color: var(--font-color);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 10px;
  font-size: 12px;
  outline: none;
}
#nav {
  padding: 10px 0;
}
#nav > * {
  margin: 10px;
}
#nav > a {
  font-weight: bold;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
