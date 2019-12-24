<template>
  <div>
    <div
      v-if="this.noFiles"
      :style="{ textAlign: 'center' }"
    >No files!</div>
    <div v-else>
      <search />
      <pagination />
      <gallery />
      <pagination :scrollToTop="true" />
    </div>
  </div>
</template>

<script>
import Search from './Search'
import Pagination from './Pagination'
import Gallery from './Gallery'

export default {
  name: 'index',
  components: { Search, Pagination, Gallery },
  computed: {
    noFiles() {
      return this.$store.getters.files.length === 0
    }
  }
}
</script>

<style>
</style>
