<template>
  <div
    id="upload"
    class="flex-center"
  >
    <!-- <div>
      <input
        type="file"
        id="file"
        ref="file"
        v-on:change="handleFileUpload()"
      />
    </div>-->
    <!-- <input
      type="file"
      id="file"
      ref="file"
      v-on:change="handleFileUpload()"
    />
    <label for="file">choose a file</label>-->
    <!-- <v-button :onClick="submitFile()">submit</v-button> -->
    <input
      type="file"
      id="file"
      ref="file"
      v-on:change="handleFileUpload()"
    />
    <label for="file">choose a file</label>
    <label
      v-if="this.file"
      class="overflow"
    >{{ this.file.name }}</label>
    <v-button :onClick="submitFile">submit</v-button>
  </div>
</template>

<script>
import axios from 'axios'
import Button from '@/components/Button'

export default {
  name: 'upload',
  components: { 'v-button': Button },
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
      if (this.file !== '') {
        let formData = new FormData()
        formData.append('file', this.file)

        axios.post('http://localhost:8081/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
          this.file = ''
        })
      }
    }
  }
}
</script>

<style>
#upload {
  padding: 40px 0;
}
#upload > * {
  margin-right: 10px;
}
[type='file'] {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute !important;
  white-space: nowrap;
  width: 1px;
}
[type='file'] + label {
  display: inline-block;
  background: var(--color-secondary);
  color: var(--color-accent);
  border: 2px solid var(--color-accent);
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition-duration: 0.1s;
}
[type='file']:focus + label,
[type='file'] + label:hover {
  background: var(--color-accent);
  color: white;
}
.overflow {
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
