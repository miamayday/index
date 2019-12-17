<template>
  <div id="search">
    <input
      v-model="filter"
      placeholder="search for pix"
    />
    <button @click="filter=''">reset</button>
  </div>
</template>

<script>
export default {
  name: 'search',
  computed: {
    filter: {
      get() {
        return this.$store.getters.filter
      },
      set(value) {
        this.$store.commit('updateFilter', value)
      }
    }
  }
}
</script>

<style scoped>
#search {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}
#search > * {
  margin-right: 10px;
}
</style>
