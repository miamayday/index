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
  mounted() {
    const columns = this.nofColumns()
    const capacity = this.$store.getters.capacity
    // fix capacity issue...
  },
  computed: {
    files() {
      const files = this.$store.getters.files
      const start = this.$store.getters.start
      const end = this.$store.getters.end

      console.log('from', start, 'to', end)

      return files.slice(start, end)
      // return []

      // const allFiles = this.$store.getters.files
      // const filter = this.$store.getters.filter

      // if (filter == '') return allFiles

      // let filters = filter.split(',').filter(f => f !== '')
      // let results = []
      // for (const filter of filters) {
      // let result = allFiles.filter(f =>
      //   (f.tags.join('') + f.type)
      //     .toLowerCase()
      //     .includes(filter.toLowerCase())
      // )

      // let result = allFiles.filter(f =>
      //   (f.name.split('.').pop())
      //     .toLowerCase()
      //     .includes(filter.toLowerCase())
      // )

      // let result = allFiles.filter(f => {
      //   const format = f.name.split('.').pop()
      //   if (format.toLowerCase().includes(filter.toLowerCase())) {
      //     return true
      //   } else {
      //     return false
      //   }
      // })

      // let result = allFiles.filter(f => function() {
      //   const format = f.split('.').pop()
      //   const interval = f.tags.join('') + f.type + format
      //   if (interval.toLowerCase().includes(filter.toLowerCase())) {
      //     return true
      //   } else {
      //     return false
      //   }
      // })
      // results = results.concat.apply([], result)
    }
    // return results
  },
  methods: {
    getPath(file) {
      try {
        return require(`./../../../data/uploads/${file.type}/${file.name}`)
      } catch (e) {
        console.error(e.message)
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
}
@media only screen and (max-width: 1100px) {
  .grid {
    width: 100%;
  }
  .grid-item-container {
    float: left;
    position: relative;
    padding-bottom: calc(100% / 3);
    width: calc(100% / 3);
  }
  .grid-item {
    position: absolute;
    top: 0;
    bottom: 1px;
    left: 0;
    right: 1px;
  }
  .grid::after {
    content: '';
    display: block;
    clear: both;
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
    float: left;
    position: relative;
    padding-bottom: 100%;
    width: 100%;
  }
  .grid-item {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .grid::after {
    content: '';
    display: block;
    clear: both;
  }
}
/* @media only screen and (min-width: 1750px) {
  .grid {
    grid-template-columns: repeat(5, 1fr);
  }
} */
</style>
