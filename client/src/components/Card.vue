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
    <!-- <div>{{ file.name }}</div>
    <a
      v-for="tag in file.tags"
      :key="tag"
      @click="$emit('searchBy', tag)"
    >{{ tag }}</a>-->
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    path: String,
    file: Object
  },
  data() {
    return {
      onPreview: false
    }
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

<style>
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
a {
  color: rgb(153, 153, 153);
  margin-right: 10px;
}
a:hover {
  color: rgb(116, 116, 116);
  cursor: pointer;
}
</style>
