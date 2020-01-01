<template>
  <transition name="modal">
    <div
      class="modal-mask"
      @click="closeModal()"
    >
      <div class="modal-wrapper">
        <div
          class="modal-container"
          @mouseover="() => this.canClose = false"
          @mouseleave="() => this.canClose = true"
        >
          <div class="modal-banner">
            <img :src="this.path" />
          </div>

          <div class="modal-content">
            <div class="modal-title">
              <slot name="title">default title</slot>
            </div>

            <div class="modal-body">
              <slot name="body">default body</slot>
            </div>

            <!-- <div class="modal-footer">
              <slot name="footer">default footer</slot>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import JQuery from 'jquery'
import myMixin from '@/mixins/myMixin'
import Button from '@/components/Button'

const $ = JQuery

export default {
  name: 'modal',
  mixins: [myMixin],
  props: ['path'],
  components: { 'v-button': Button },
  data() {
    return {
      canClose: false
    }
  },
  mounted() {
    let { x, y } = this.$store.getters.mousePos
    let el = document.elementFromPoint(x, y)
    let cont = $('.modal-container')
    if (el !== cont) {
      this.canClose = true
    }
  },
  methods: {
    closeModal() {
      if (this.canClose) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid var(--border-color);
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  max-height: 80%;
  overflow-y: auto;
}
.modal-container {
  background: var(--color-secondary);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
}
.modal-banner {
  margin: 0 auto;
  max-width: 100%;
  max-height: 100%;
}
.modal-banner img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  min-width: 0;
  min-height: 0;
}
.modal-content {
  padding: 10px;
  border-top: 1px solid var(--border-color);
}
.modal-content input {
  border: 0;
  border-radius: 0;
  padding: 0;
  padding-bottom: 2px;
  padding-left: 2px;
  border-bottom: 1px solid var(--border-color);
}
.modal-title {
  color: var(--color-primary);
  font-weight: bold;
  margin-bottom: 15px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
