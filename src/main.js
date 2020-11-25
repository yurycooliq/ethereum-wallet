import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import './assets/tailwind.css';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    address: '',
  },
  getters: {
    address: (state) => state.address,
  },
  mutations: {
    address: (state, address) => {
      state.address = address;
    },
  },
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
