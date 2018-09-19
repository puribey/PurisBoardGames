<template>
    <v-card>
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="onCreateGameCard">
        <v-card-title>
            <span class="headline">New Game</span>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field 
                  v-model="title"
                  label="Title"
                  id="title"
                  :rules="titleRules"
                  required
                  color="deep-purple lighten-2"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-select
                    v-model="selectType"
                    :items= "[
                        'Strategy',
                        'Party',
                        'Worker Placement',
                        'Competitive',
                        'Cooperative'
                    ]"
                    :rules="[v => !!v || 'Type is required']"
                    label="Type"
                    id="type"
                    required
                    color="deep-purple lighten-2"
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-select
                    v-model="selectPoints"
                    :items="[1, 2, 3, 4, 5]"
                    label="Points"
                    id="value"
                    required
                    color="deep-purple lighten-2"
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                   <v-text-field
                   v-model="description"
                   id="description"
                   label="Descrption"
                   :rules="descriptionRules"
                   required
                   color="deep-purple lighten-2"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field 
                    v-model="src"
                    label="Image URL"
                    id="src"
                    required
                    color="deep-purple lighten-2"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                   <v-btn 
                      raised 
                      color="deep-purple lighten-2" 
                      class="white--text button-no-margin" 
                      @click="onPickPicture">Upload Image</v-btn>
                   <input 
                      type="file" 
                      style="display: none" 
                      ref="fileInput" 
                      accept="image/*" 
                      @change="onPicturePiked"/> <!-- we can asign any key we want to this ref / accept="image/*" will allow us to set any image we want -->
                </v-flex>
                <v-flex xs12>
                  <img :src="src" height="150px">
                </v-flex>
                <small class="deep-purple--text lighten-2">*indicates required field</small>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="deep-purple lighten-2" flat @click="handleClickModal()">Close</v-btn>
            <v-btn color="deep-purple lighten-2" flat @click="handleClickModal()" type="submit" :disabled="!formIsValid">Save</v-btn>
            <v-btn color="deep-purple lighten-2" flat @click="clear()" type="reset">Reset</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
</template>

<script>

export default {
  name: "AddGame",
  props: {},
  data() {
    return {
      valid: true,
      title: "",
      titleRules: [
        v => !!v || "Title is required",
      ],
      selectType: null,
      selectPoints: null,
      description: "",
      descriptionRules: [
        v => !!v || "Description is required",
        v => (v && v.length > 10) || 'Description must be more than 10 characters'
      ],
      src: "",
      image: null
    };
  },
  computed:{
    formIsValid(){
      return this.title !== '' && this.description !== '' && this.src !== ''
    }
  },
  methods: {
    handleClickModal() {
      this.$emit("onCloseModal");
    },
    clear() {
      this.image = null
      this.src = ""
    },
    onCreateGameCard(){
      if(!this.formIsValid || !this.image){
        return
      }
      const gameInfo = {
        title: this.title,
        type: this.selectType,
        value: this.selectPoints,
        description: this.description,
        image: this.image
      }
      this.$store.dispatch("createGameCard", gameInfo)
    },
    onPickPicture(){
      this.$refs.fileInput.click();
    },
    onPicturePiked(e){
      const files = e.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0){
        return alert('Please add a valid file!')
      }
      // turn this binary file into a base 64 string using javaScript file reader API
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.src = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
};
</script>

<style scoped>
.button-no-margin {
  margin: 0;
}
</style>