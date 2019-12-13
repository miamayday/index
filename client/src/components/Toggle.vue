<template>
  <div>
    <div
      v-if="toggled"
      @click="toggled = false"
    >
      <button>untoggle</button>
    </div>
    <div
      v-else
      @click="toggled = true"
    >
      <button>toggle</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'toggle',
  data() {
    return {
      toggled: false
    }
  }
}
</script>

<style>
</style>
