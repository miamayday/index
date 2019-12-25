import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    files: [],
    filter: '',
    pagination: {
      page: 1,
      capacity: 12,
      start: 0,
      end: 12
    },
    playingVideo: null
  },
  mutations: {
    initFiles(state, files) {
      console.log('received', files.length, 'files')
      state.files = files
    },
    addFile(state, file) {
      state.files = state.files.concat(file)
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    setPage(state, page) {
      state.pagination.page = page
    },
    setStart(state, start) {
      state.pagination.start = start
    },
    setEnd(state, end) {
      state.pagination.end = end
    },
    setPlayingVideo(state, playingVideo) {
      state.playingVideo = playingVideo
    }
  },
  getters: {
    files: state => state.files,
    filter: state => state.filter,
    page: state => state.pagination.page,
    capacity: state => state.pagination.capacity,
    start: state => state.pagination.start,
    end: state => state.pagination.end,
    playingVideo: state => state.playingVideo
  }
})
