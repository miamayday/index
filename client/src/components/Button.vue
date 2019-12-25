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
  color: rgb(107, 190, 218);
  border: 2px solid rgb(126, 223, 255);
  padding: 5px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition-duration: 0.1s;
}
.v-button:hover {
  background-color: rgb(126, 223, 255);
  color: white;
}
</style>
