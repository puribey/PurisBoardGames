<template>
  <v-container grid-list-xl text-xs-center> <!-- add fluid -->
    <v-layout row wrap>
      <v-flex xs12>
        <v-img :src="game.src" max-height="400"> 
        </v-img>
      </v-flex>
      <v-flex xs12 sm6>
        <h3 class="display-3 deep-purple--text lighten-2 mb-3" >{{game.title}}</h3>
      </v-flex>
      <v-flex xs12 sm6>
        <v-rating
          :value="game.value"
          color="deep-purple lighten-2"
          dense
          half-increments
          readonly
          class="mb-4 mt-3"
          size="40"
        ></v-rating>
      </v-flex>
      <v-flex xs12>
        <p class="subheading text-md-left">{{game.description}}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'GameDetail',
  computed: {
    game() {
      return this.$store.getters.getGame(this.$route.params.id)
    }
  }
}
</script>

<style scoped>
</style>
