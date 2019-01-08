import Vue from 'vue';
import Stage from './components/Stage.vue';
import Object from './components/Object.vue';
import 'normalize.css';

Vue.component('obj', Object);

new Vue({
  el: '#stage',
  render: h => h(Stage)
});
