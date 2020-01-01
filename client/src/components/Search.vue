<template>
  <form id="search">
    <input
      v-model="filter"
      placeholder="search for pix"
    />
    <div v-if="filter.length > 0"
      id="reset"
      @click="() => filter = ''"
    ></div>
  </form>
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
        this.$store.commit('setFilter', value)
      }
    }
  }
}
</script>

<style>
#search {
  padding: 10px 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
#reset input {
  position: absolute;
  margin-right: 20px;
}
#reset {
  position: relative;
  display: inline-block;
  right: 25px;
  cursor: pointer;
  color: var(--color-accent);
}
#reset:after {
  content: 'x';
  position: absolute;
  padding: 5px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  text-align: center;
}
</style>
