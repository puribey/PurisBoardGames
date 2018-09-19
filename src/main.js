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
      apiKey: "lkfsnldnfl",
      authDomain: "kfasjbkjfbakjbf",
      databaseURL: "kasfjnfkljnaskl",
      projectId: "zksjbfkjszbf",
      storageBucket: "sjnfkjanfk"
    });
    this.$store.dispatch("loadGames");
  }
}).$mount("#app");
