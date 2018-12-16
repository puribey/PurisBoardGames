<template>
<v-container fluid grid-list-xl class="lateral">
  <v-layout>
    <v-flex xs12 class="text-xs-center">
      <v-progress-circular
        :rotate="180"
        :size="100"
        :width="15"
        :value="value"
        v-if="loading"
        color="deep-purple lighten-2"
      >
        {{ value }}
      </v-progress-circular>
    </v-flex>
  </v-layout>
  <v-layout row wrap v-if="!loading">
    <v-flex v-for="game in games" :key="game.id" xs12 sm3>
      <GameCard :gameProp="game"></GameCard>
    </v-flex>
  </v-layout>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-btn
      color="deep-purple lighten-2"
      dark
      fab
      fixed
      bottom
      right
      slot="activator"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <AddGame @onCloseModal="onCloseModal()"/>
  </v-dialog>
</v-container>
</template>

<script>
import AddGame from "./AddGame";
import GameCard from "./GameCard";
export default {
  name: "MyList",
  components: {
    AddGame,
    GameCard
  },
  data() {
    return {
      favorite: false,
      dialog: false,
      interval: {},
      value: 0
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  mounted () {
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0)
      }
      this.value += 10
    }, 600)
  },
  computed: {
    games() {
      return this.$store.getters.getGameList
    },
    loading() {
      return this.$store.getters.getLoader
    }
  },
  methods: {
    onCloseModal(){
      this.dialog = false
    }
  }
};
</script>

<style scoped>
.lateral .v-speed-dial,
.lateral .v-btn--floating {
  position: fixed;
}
.lateral .v-btn--floating {
  margin: 16px 16px 30px 16px;
}

</style>