import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    files: [],
    filter: '',
    start: 0,
    end: 12
  },
  mutations: {
    initFiles(state, files) {
      console.log('received', files.length, 'files')
      state.files = files
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    setStart(state, start) {
      state.start = start
    },
    setEnd(state, end) {
      state.end = end
    }
  },
  getters: {
    files: state => state.files,
    filter: state => state.filter,
    start: state => state.start,
    end: state => state.end
  }
})
