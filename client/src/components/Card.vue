<template>
  <div class="card">
    <img
      v-if="file.type == 'img'"
      :src="path"
      @click="togglePreview()"
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
      @close="togglePreview()"
    >
      <div slot="header">{{ this.file.name }}</div>
      <img
        v-if="file.type == 'img'"
        slot="body"
        :src="path"
        @click="togglePreview()"
      />
    </modal>
  </div>
</template>

<script>
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
      onPreview: false
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
    togglePreview() {
      this.onPreview = !this.onPreview
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
.preview {
  z-index: 9999;
}
</style>
