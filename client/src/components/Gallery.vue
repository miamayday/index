<template>
  <div class="gallery">
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
import Card from './Card'

export default {
  name: 'gallery',
  components: { Card },
  computed: {
    files() {
      const allFiles = this.$store.getters.files
      const filter = this.$store.getters.filter

      if (filter == '') return allFiles

      let filters = filter.split(',').filter(f => f !== '')
      let results = []
      for (const filter of filters) {
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

        let result = allFiles.filter(f => {
          const format = f.name.split('.').pop()
          if (format.toLowerCase().includes(filter.toLowerCase())) {
            return true
          } else {
            return false
          }
        })

        // let result = allFiles.filter(f => function() {
        //   const format = f.split('.').pop()
        //   const interval = f.tags.join('') + f.type + format
        //   if (interval.toLowerCase().includes(filter.toLowerCase())) {
        //     return true
        //   } else {
        //     return false
        //   }
        // })
        results = results.concat.apply([], result)
      }
      return results
    }
  },
  methods: {
    getPath(file) {
      try {
        return require(`./../../../data/uploads/${file.type}/${file.name}`)
      } catch (e) {
        console.error(e)
      }
    },
    onClickTag(value) {
      this.filter = value
    }
  }
}
</script>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 40px;
}
</style>
