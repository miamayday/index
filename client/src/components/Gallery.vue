<template>
  <div class="grid">
    <div
      class="grid-item-container"
      v-for="file in files"
      :key="file.id"
    >
      <card
        class="grid-item"
        :path="getPath(file)"
        :file="file"
        @searchBy="onClickTag"
      />
    </div>
  </div>
</template>

<script>
import myMixin from '@/mixins/myMixin.js'
import Card from './Card'

export default {
  name: 'gallery',
  mixins: [myMixin],
  components: { Card },
  computed: {
    files() {
      const files = this.$store.getters.files
      const filter = this.$store.getters.filter

      let results = files

      if (filter !== '') {
        const filters = filter.split(',').filter(f => f !== '')
        results = []

        for (const filter of filters) {
          const result = files.filter(f =>
            f.tags
              .join('')
              .toLowerCase()
              .includes(filter.toLowerCase())
          )
          results = results.concat.apply([], result)
        }
      }

      const start = this.$store.getters.start
      const end = this.$store.getters.end

      console.log('from', start, 'to', end)

      return results.slice(start, end)
    }
  },
  methods: {
    getPath(file) {
      try {
        return require(`./../../../data/uploads/${file.type}/${file.name}`)
      } catch (e) {
        // console.log(e.message)
      }
    },
    onClickTag(value) {
      this.filter = value
    }
  }
}
</script>

<style>
.grid {
  margin: 0 auto;
  background: var(--color-secondary);
}
.grid::after {
  content: '';
  display: block;
  clear: both;
}
.grid-item-container {
  float: left;
  position: relative;
}
.grid-item {
  position: absolute;
  top: 0;
  left: 0;
}
@media only screen and (max-width: 1100px) {
  .grid {
    padding: 0 5px;
  }
  .grid-item-container {
    padding-bottom: calc(100% / 3);
    width: calc(100% / 3);
  }
  .grid-item {
    bottom: 1px;
    right: 1px;
  }
}
@media only screen and (min-width: 1100px) {
  .grid {
    width: 80%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-auto-rows: 1fr;
    grid-gap: 4em;
  }
  .grid-item-container {
    padding-bottom: 100%;
    width: 100%;
  }
  .grid-item {
    bottom: 0;
    right: 0;
  }
}
</style>
