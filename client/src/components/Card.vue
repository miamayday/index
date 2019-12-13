<template>
  <div class="card">
    <img
      v-if="file.type == 'img'"
      :src="path"
    />
    <video
      v-else
      ref="video"
      @click="playVideo()"
    >
      <source
        :src="path"
        :type="`video/${file.name.split('.').pop()}`"
      />
    </video>
    <div>{{ file.name }}</div>
    <a
      v-for="tag in file.tags"
      :key="tag"
      @click="$emit('searchBy', tag)"
    >{{ tag }}</a>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    path: String,
    file: Object
  },
  methods: {
    playVideo() {
      let video = this.$refs.video
      if (!video.looped) video.loop = true
      if (video.paused) video.play()
      else video.pause()
    }
  }
}
</script>

<style scoped>
.card {
  display: block;
  overflow-wrap: break-word;
  font-style: italic;
  color: #e895ab;
}
.card img {
  max-width: 100%;
}
.card img:focus {
  outline: none;
}
.card video {
  max-width: 100%;
}
.card video:focus {
  outline: none;
}
a {
  color: rgb(153, 153, 153);
  margin-right: 10px;
}
a:hover {
  color: rgb(116, 116, 116);
  cursor: pointer;
}
</style>
