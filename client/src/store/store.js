import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        files: [],
        filter: ''
    },
    mutations: {
        initFiles(state, files) {
            console.log('received', files.length, 'files')
            state.files = files
        },
        updateFilter(state, filter) {
            state.filter = filter
        }
    },
    getters: {
        files: state => state.files,
        filter: state => state.filter
    }
})
