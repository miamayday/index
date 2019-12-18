<template>
  <div>
    <search />
    <pagination />
    <gallery />
  </div>
</template>

<script>
import Search from './Search'
import Pagination from './Pagination'
import Gallery from './Gallery'

export default {
  name: 'index',
  components: { Search, Pagination, Gallery }
}
</script>

<style>
</style>
