import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gameList: [],
    favouriteGames: []
  },
  mutations: {
    ADD_REMOVE_FAVOURITE(state, payload) {
      const updatedFavourite = state.gameList.map((game, index) => {
        if (game.id === payload) {
          game.favourite = !game.favourite;
          if (game.favourite == true) {
            state.favouriteGames = [...state.favouriteGames, game];
          } else {
            state.favouriteGames = [
              ...state.favouriteGames.slice(0, index),
              ...state.favouriteGames.slice(index + 1)
            ];
          }
        }
        return game;
      });
      state.gameList = updatedFavourite;
    },
    CREATE_GAMECARD(state, payload) {
      state.gameList = [...state.gameList, payload];
    },
    SET_LOADED_GAMES(state, payload) {
      state.gameList = payload;
    }
  },
  actions: {
    updateFavourite({ commit }, payload) {
      commit("ADD_REMOVE_FAVOURITE", payload);
    },
    createGameCard({ commit }, payload) {
      const game = {
        favourite: false,
        title: payload.title,
        // src: payload.src, // I dont need image here anymore because i need to store it 
        description: payload.description,
        value: payload.value,
        type: payload.type
      };
      // Reach out to firebase and store it
      // push(add data) / set / update
      let imageSRC 
      let key
      firebase
        .database()
        .ref("games")
        .push(game)
        .then( data => {
          const filename = payload.image.name
          const extention = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('games/' + data.key + '.' + extention).put(payload.image)
        })
        .then( fileData => {
          return fileData.ref.getDownloadURL()
          .then( imageSRC => {
            return firebase.database().ref('games').child(key).update({src: imageSRC})
          })
        })
        .then(() => {
          commit("CREATE_GAMECARD", {
            ...game,
            src: imageSRC,
            id: key
          })
        })
        .catch(error => {
          return error;
        });
    },
    // will call this games in main.js where I load my games
    loadGames({ commit }) {
      firebase
        .database()
        .ref("games")
        .once("value")
        .then(data => {
          //console.log(data);
          const games = [];
          // I need to transform games data to have the shape I need for my database
          const obj = data.val(); // access to values in data
          // loop for all the keys in my object
          for (let key in obj) {
            games.push({
              id: key,
              favourite: false,
              title: obj[key].title,
              src: obj[key].src,
              description: obj[key].description,
              value: obj[key].value,
              type: obj[key].type
            });
          }
          commit("SET_LOADED_GAMES", games);
        })
        .catch(error => {
          return error
        });
    }
  },
  getters: {
    getGameList(state) {
      return state.gameList.sort((a, b) => {
        return a.value < b.value ? 1 : -1;
      });
    },
    getGame(state) {
      return gameID => {
        return state.gameList.find(game => {
          return game.id == gameID;
        });
      };
    },
    getFavouriteGames(state) {
      return state.favouriteGames;
    }
  }
});
