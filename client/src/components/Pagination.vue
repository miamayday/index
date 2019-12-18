<template>
  <div>
    <div id="pagination">
      <a @click="decrementPage()">prev</a>
      <span>{{ this.page }}</span>
      <a @click="incrementPage()">next</a>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  data() {
    return {
      page: 1,
      capacity: 12
    }
  },
  methods: {
    incrementPage() {
      const nofFiles = this.$store.getters.files.length
      const lastPage = Math.ceil(nofFiles / this.capacity)

      let start = (this.page - 1) * this.capacity
      let end = start + this.capacity

      if (this.page === lastPage - 1) {
        start += this.capacity
        end = nofFiles
        this.page++
      } else if (this.page < lastPage - 1) {
        start += this.capacity
        end += this.capacity
        this.page++
      }

      this.$store.commit('setStart', start)
      this.$store.commit('setEnd', end)
    },
    decrementPage() {
      const nofFiles = this.$store.getters.files.length
      const lastPage = Math.ceil(nofFiles / this.capacity)

      let start = (this.page - 1) * this.capacity
      let end = start + this.capacity

      if (this.page === lastPage && this.page > 1) {
        const mod = nofFiles % this.capacity
        end = nofFiles - mod
        start = end - this.capacity
        this.page--
      } else if (this.page > 1) {
        start -= this.capacity
        end -= this.capacity
        this.page--
      }

      this.$store.commit('setStart', start)
      this.$store.commit('setEnd', end)
    }
  }
}
</script>

<style scoped>
#pagination {
  margin: 50px 0;
  text-align: center;
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
