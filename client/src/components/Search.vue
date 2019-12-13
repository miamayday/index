<template>
  <div>
    <input
      v-model="filter"
      placeholder="search for pix"
      :style="{ marginBottom: '40px' }"
    />
    <button
      :style="{ margin: '0 10px', textAlign: 'center' }"
      @click="filter=''"
    >reset</button>
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

<style>
</style>
