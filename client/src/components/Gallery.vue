<template>
  <div class="grid">
    <card
      v-for="file in files"
      :key="file.id"
      :path="getPath(file)"
      :file="file"
      @searchBy="onClickTag"
    />
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
    this.preserveRatio()
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

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-auto-rows: 20rem;
  grid-gap: 1px;
}
@media only screen and (min-width: 1000px) {
  .grid {
    grid-gap: 40px;
    margin: 0 15%;
  }
}
</style>
