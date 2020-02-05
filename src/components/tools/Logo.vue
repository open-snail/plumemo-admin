<template>
  <div class="logo">
    <router-link :to="{name:'dashboard'}">
      <img :src="Logo" />
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'Logo',
  components: {
  },
  data () {
    return {
      Logo: require('@/assets/logo.png')
    }
  },
  props: {
    title: {
      type: String,
      default: 'HELLO BLOG',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
