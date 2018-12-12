import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import Vuetify from "vuetify";
import router from "./router";
import store from "./store/index";
import * as firebase from "firebase";

Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyA4KqMk9hNuTnFP85afQH64qxLcr5gLJmw",
      authDomain: "puris-boardgames.firebaseapp.com",
      databaseURL: "https://puris-boardgames.firebaseio.com",
      projectId: "puris-boardgames",
      storageBucket: "gs://puris-boardgames.appspot.com"
    });
    this.$store.dispatch("loadGames");
  }
}).$mount("#app");
