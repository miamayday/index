<template>
  <div class="v-button" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'v-button',
  props: {
    onClick: {
      type: Function,
      required: true
    }
  }
}
</script>

<style>
.v-button {
  display: inline-block;
  background: var(--color-secondary);
  color: var(--color-accent);
  border: 2px solid var(--color-accent);
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition-duration: 0.1s;
}
.v-button:hover {
  background: var(--color-accent);
  color: white;
}
.v-button:focus {
  outline: none;
}
.v-button::-moz-focus-inner {
  border: 0;
}
</style>
