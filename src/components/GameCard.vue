<template>
<v-hover >
    <v-card
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 12 : 2}`"
        class="mx-auto"
    >
        <v-img
        :aspect-ratio="16/9"
        :src="card.src"
        >
        <div class="flex-button">
        <v-btn icon @click="onFavorite()" color="white">
            <v-icon color="deep-purple lighten-2" v-if="!favorite">favorite_border</v-icon>
            <v-icon color="deep-purple lighten-2" v-if="favorite">favorite</v-icon>
        </v-btn>
        </div>
        </v-img>
        <v-card-title>
        <div>
            <span class="headline">{{card.title}}</span>
            <p class="subheading">Type: {{card.type}}</p>
        </div>
        </v-card-title>
        <v-card-actions>
          <div class="d-flex">
            <v-rating
                :value="card.value"
                color="deep-purple lighten-2"
                dense
                half-increments
                readonly
                size="20"
            ></v-rating>
            </div>
            <v-spacer></v-spacer>
            <v-btn flat>More</v-btn>
        </v-card-actions>
    </v-card>
</v-hover>
</template>

<script>
export default {
  name: "GameCard",
  props: {
    card: Object
  },
  data() {
    return {
        favorite: false
    };
  },
  methods: {
    onFavorite() {
      this.favorite = !this.favorite
    }
  }
};
</script>

<style scoped>
.flex-button {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}
</style>
