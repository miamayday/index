<template>
  <div
    v-if="!isA"
    class="v-button"
    @click="onClickA(); isA = !isA"
  >
    {{ titleA }}
  </div>
  <div
    v-else
    class="v-button"
    @click="onClickB(); isA = !isA"
  >{{ titleB }}</div>
</template>

<script>
export default {
  name: 'toggle-button',
  props: {
    titleA: {
      type: String,
      required: true
    },
    titleB: {
      type: String,
      required: true
    },
    onClickA: {
      type: Function,
      required: true
    },
    onClickB: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      isA: false
    }
  }
}
</script>

<style>
</style>
