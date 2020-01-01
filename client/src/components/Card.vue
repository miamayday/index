<template>
  <div class="card">
    <div
      v-if="this.file.type == 'img'"
      class="card-banner"
    >
      <div class="card-banner-item">
        <img
          :src="this.path"
          @click="showPreview()"
        />
      </div>
    </div>
    <div
      v-else
      class="card-banner"
    >
      <div class="card-banner-item">
        <video
          :id="this.file.id + '_vid'"
          ref="video"
          @click="playVideo()"
        >
          <source
            :src="path"
            :type="`video/${this.file.name.split('.').pop()}`"
          />
        </video>
      </div>
    </div>

    <div class="card-content">
      <div
        v-if="this.file.type === 'vid'"
        class="card-icon"
      >
        <img src="@/film.png" />
      </div>
      <div class="card-title">{{ this.file.name }}</div>
    </div>

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
            @click="searchBy(tag)"
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
        axios.put(`http://localhost:8081/api/files/${this.file.id}`, this.file)
      }
      this.tag = ''
    },
    searchBy(key) {
      this.closePreview()
      this.$store.commit('setFilter', key)
    }
  }
}
</script>

<style scoped>
.card {
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  width: 100%;
  max-width: 100%;
  min-height: 100%;
  height: 100%;
  max-height: 100%;
}
.card-banner {
  flex: 1;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: var(--border-color);
}
.card-banner-item {
  position: relative;
  width: 100%;
  height: 100%;
}
.card-banner img {
  position: absolute;
  width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
.card-banner video {
  position: absolute;
  width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
.video-icon {
  padding: 10px;
}
.video-icon img {
  width: 30px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.card-content {
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 40px;
}
.card-icon {
  margin-right: 10px;
}
.card-icon img {
  height: 20px;
}
.card-title {
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
}
#tags > * {
  margin: 0 10px;
  cursor: pointer;
}
</style>
