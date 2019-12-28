<template>
  <div
    id="search"
    class="flex-center"
  >
    <form>
      <input
        v-model="filter"
        placeholder="search for pix"
      />
      <div
        id="reset"
        @click="() => filter = ''"
      >x</div>
    </form>
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
        this.$store.commit('setFilter', value)
      }
    }
  }
}
</script>

<style>
#search {
  padding: 10px 0;
}
#reset {
  position: relative;
  display: inline-block;
  width: 10px;
  height: 10px;
  right: 18px;
  cursor: pointer;
  color: var(--color-accent);
}
#reset:after {
  content: '';
  display: block;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  text-align: center;
}
</style>
