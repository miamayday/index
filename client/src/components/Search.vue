<template>
  <div id="search" class="flex-center">
    <input
      v-model="filter"
      placeholder="search for pix"
    />
    <v-button :onClick="resetFilter">reset</v-button>
  </div>
</template>

<script>
import Button from '@/components/Button'

export default {
  name: 'search',
  components: { 'v-button': Button },
  computed: {
    filter: {
      get() {
        return this.$store.getters.filter
      },
      set(value) {
        this.$store.commit('updateFilter', value)
      }
    }
  },
  methods: {
    resetFilter() {
      this.filter = ''
    }
  }
}
</script>

<style>
#search {
  padding: 10px 0;
}
#search > * {
  margin-right: 10px;
}
</style>
