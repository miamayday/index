<template>
  <div
    id="pagination"
    class="flex-center"
  >
    <a
      v-if="this.scrollToTop"
      @click="changePage(false); backToTop();"
    >prev</a>
    <a
      v-else
      @click="changePage(false)"
    >prev</a>
    <span>{{ this.getPage }}</span>
    <a
      v-if="this.scrollToTop"
      @click="changePage(true); backToTop();"
    >next</a>
    <a
      v-else
      @click="changePage(true)"
    >next</a>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: ['scrollToTop'],
  computed: {
    getPage() {
      return this.$store.getters.page
    }
  },
  methods: {
    backToTop() {
      window.scrollTo(0, 0)
    },
    changePage(increment) {
      const nofFiles = this.$store.getters.files.length
      const page = this.$store.getters.page
      const capacity = this.$store.getters.capacity
      const lastPage = Math.ceil(nofFiles / capacity)

      let params = {
        nofFiles,
        page,
        capacity,
        lastPage
      }

      if (increment) {
        this.incrementPage(params)
      } else {
        this.decrementPage(params)
      }
    },
    incrementPage(params) {
      const { nofFiles, page, capacity, lastPage } = params

      let start = (page - 1) * capacity
      let end = start + capacity

      if (page === lastPage - 1) {
        start += capacity
        end = nofFiles
        this.$store.commit('setPage', page + 1)
      } else if (page < lastPage - 1) {
        start += capacity
        end += capacity
        this.$store.commit('setPage', page + 1)
      }

      this.$store.commit('setStart', start)
      this.$store.commit('setEnd', end)
    },
    decrementPage(params) {
      const { nofFiles, page, capacity, lastPage } = params

      let start = (page - 1) * capacity
      let end = start + capacity

      if (page === lastPage && page > 1) {
        const mod = nofFiles % capacity
        end = nofFiles - mod
        start = end - capacity
        this.$store.commit('setPage', page - 1)
      } else if (page > 1) {
        start -= capacity
        end -= capacity
        this.$store.commit('setPage', page - 1)
      }

      this.$store.commit('setStart', start)
      this.$store.commit('setEnd', end)
    }
  }
}
</script>

<style>
#pagination {
  padding: 50px 0;
  background-color: var(--color-secondary);
}
#pagination > * {
  margin-right: 20px;
  color: inherit;
  text-decoration: none;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                        supported by Chrome, Opera and Firefox */
}
#pagination > a:focus {
  text-decoration: none;
}
#pagination > a:hover {
  cursor: pointer;
}
</style>
