<template>
    <v-card>
        <v-card-title>
            <span class="headline">New Game</span>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
            <v-layout wrap>
                <v-flex xs12>
                <v-text-field label="Email" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                <v-text-field label="Password" type="password" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                <v-select
                    :items="['0-17', '18-29', '30-54', '54+']"
                    label="Age"
                    required
                ></v-select>
                </v-flex>
                <v-flex xs12>
                <v-autocomplete
                    :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                    label="Interests"
                    multiple
                    chips
                ></v-autocomplete>
                </v-flex>
            </v-layout>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="handleClickModal()">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  name: "AddGame",
  props: {
    
  },
  data() {
    return {
    
    };
  },
  methods: {
    handleClickModal() {
      this.$emit("onCloseModal");
    }
  }
};
</script>

<style scoped>
</style>