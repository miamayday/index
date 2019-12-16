<template>
  <div>
    <search />
    <gallery />
  </div>
</template>

<script>
import Search from './Search'
import Gallery from './Gallery'

export default {
  name: 'index',
  components: { Search, Gallery }
}
</script>

<style>
</style>
