<template>
  <div class="card">
    <img
      v-if="file.type == 'img'"
      :src="this.path"
      @click="showPreview()"
    />
    <video
      v-else
      :id="this.file.id + '_vid'"
      ref="video"
      @click="playVideo()"
    >
      <source
        :src="path"
        :type="`video/${file.name.split('.').pop()}`"
      />
    </video>
    <!-- <div>{{ file.name }}</div>
    <a
      v-for="tag in file.tags"
      :key="tag"
      @click="$emit('searchBy', tag)"
    >{{ tag }}</a>-->
    <modal
      v-if="this.onPreview"
      :path="this.path"
      @close="closePreview()"
    >
      <div slot="title">{{ this.file.name }}</div>
      <div slot="body">
        <form @submit="onSubmit">
          <input
            v-model="tag"
            placeholder="add tags"
          />
        </form>
        <div
          v-if="this.file.tags.length > 0"
          id="tags"
        >
          <span
            v-for="tag in this.file.tags"
            :key="tag"
          >{{ tag }}</span>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import axios from 'axios'
import Modal from '@/components/Modal'

export default {
  name: 'card',
  props: {
    path: String,
    file: Object
  },
  components: { Modal },
  data() {
    return {
      onPreview: false,
      tag: ''
    }
  },
  methods: {
    playVideo() {
      let video = this.$refs.video
      if (!video.looped) video.loop = true
      if (video.paused) {
        let playingVideo = this.$store.getters.playingVideo
        if (playingVideo) playingVideo.pause()

        video.play()
        this.$store.commit('setPlayingVideo', video)
      } else {
        video.pause()
      }
    },
    showPreview() {
      this.onPreview = true
    },
    closePreview() {
      this.onPreview = false
    },
    onSubmit(event) {
      event.preventDefault()
      let index = this.file.tags.indexOf(this.tag)
      if (index === -1) {
        console.log(this.file.tags)
        this.file.tags = this.file.tags.concat(this.tag)
        axios.put(`http://localhost:8081/files/${this.file.id}`, this.file)
      }
      this.tag = ''
    }
  }
}
</script>

<style>
a {
  color: rgb(153, 153, 153);
  margin-right: 10px;
}
a:hover {
  color: rgb(116, 116, 116);
  cursor: pointer;
}
.card {
  display: block;
  overflow-wrap: break-word;
  font-style: italic;
}
.card:hover {
  cursor: default;
}
.card img {
  width: 100%;
  max-height: 100%;
  height: 100%;
  object-fit: cover;
}
.card img:focus {
  outline: none;
}
.card video {
  width: 100%;
  max-height: 100%;
  height: 100%;
  object-fit: cover;
}
.card video:focus {
  outline: none;
}
#tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
}
#tags > * {
  margin: 0 10px;
}
</style>
