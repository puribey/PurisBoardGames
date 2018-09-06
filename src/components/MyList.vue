<template>
<v-container fluid grid-list-xl class="lateral">
  <v-layout row wrap>
    <v-flex v-for="card in cards" :key="card.title" xs12 sm3>
      <GameCard :card="card"></GameCard>
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
      cards: [
        {
          id: 1,
          title: "Citadels",
          src:
            "https://cf.geekdo-images.com/opengraph/img/FJ13Z29rnnQTDBTG6UMv_X_IuJs=/fit-in/1200x630/pic3239104.jpg",
          value: 3,
          type: "Party"
        },
        {
          id: 2,
          title: "Russian Railroads",
          src:
            "http://www.cephalofair.com/wp-content/uploads/2014/05/russian_railroads.jpg",
          value: 5,
          type: "Worker Placement"
        },
        {
          id: 3,
          title: "Mysterium",
          src:
            "https://geekandsundry.com/wp-content/uploads/2015/09/Mysterium-Feature-962x545.jpg",
          value: 4,
          type: "Cooperative"
        },
        {
          id: 4,
          title: "King of Tokyo",
          src:
            "http://www.scottking.info/Pics/IMG_5651-1024x682.jpg",
          value: 3,
          type: "Competitive"
        },
        {
          id: 5,
          title: "Sanguosha",
          src:
            "http://www.sanguosha.com/uploads/201501/54c5af440f0e8.jpg",
          value: 5,
          type: "Competitive"
        },
        {
          id: 6,
          title: "Feast for Odin",
          src:
            "https://www.board-game.co.uk/wp-content/uploads/2017/10/A-Feast-for-Odin-Gameplay-2.jpg",
          value: 4,
          type: "Worker Placement"
        },
        {
          id: 7,
          title: "Oráculo de delfos",
          src:
            "https://lpix.org/2825194/tablero%20individual.jpg",
          value: 5,
          type: "Strategy"
        },
        {
          id: 8,
          title: "Ora et Labora",
          src:
            "https://cdn.anyfinder.eu/assets/4bcbd403ca7eb24a6d76b4c62728af24ea6974fb85c26cba078af717c266827f",
          value: 4.5,
          type: "Worker Placement"
        },
        {
          id: 9,
          title: "Concept",
          src:
            "https://www.boardgamequest.com/wp-content/uploads/2014/12/Concept-Header.jpg",
          value: 3,
          type: "Party"
        },
        {
          id: 10,
          title: "Castles of Mad King Ludwig",
          src:
            "http://tubbyandcoos.com/wp-content/uploads/2017/08/Castles-of-Mad-King-Ludwig.jpg",
          value: 3,
          type: "Strategy"
        },
        {
          id: 11,
          title: "Tsuro",
          src:
            "https://www.gamesworld.com.au/wp-content/uploads/2016/01/tsuro-3.jpg",
          value: 2,
          type: "Party"
        },
        {
          id: 12,
          title: "Evolution",
          src:
            "https://www.teamboardgame.com/wp-content/uploads/2016/05/Evolution-Cards.jpg",
          value: 4,
          type: "Strategy"
        }
      ]
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
  position: absolute;
}
.lateral .v-btn--floating {
  margin: 16px 16px 16px 16px;
}

@media only screen and (max-width: 600px) {
  .lateral .v-speed-dial,
  .lateral .v-btn--floating {
    position: fixed;
  }
  .lateral .v-btn--floating {
    margin: 16px 16px 30px 16px;
  }
}
</style>