<template>
  <div id="upload">
    <div>
      <input
        type="file"
        id="file"
        ref="file"
        v-on:change="handleFileUpload()"
      />
    </div>
    <!-- <div>
      tags <input type="text" /> <button>Add</button>
    </div> -->
    <button v-on:click="submitFile()">Submit</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'upload',
  data() {
    return {
      file: ''
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
    submitFile() {
      let formData = new FormData()
      formData.append('file', this.file)

      axios.post('http://localhost:8081/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
  }
}
</script>

<style>
#upload {
  width: 50%;
  margin: 0 auto;
}
</style>
