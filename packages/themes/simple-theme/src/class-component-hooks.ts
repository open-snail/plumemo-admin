import Component from 'vue-class-component';

Component.registerHooks([
  // Register the router hooks with their names
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
  // Register the nuxtjs hooks with their names
  'fetch',
  'asyncData',
  // Register the meta hooks with their names
  'head',
]);
