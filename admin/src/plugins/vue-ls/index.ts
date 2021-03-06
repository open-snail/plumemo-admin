import Vue from 'vue';
import VueStorage from 'vue-ls';

Vue.use(VueStorage, {
  namespace: 'po__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
});
