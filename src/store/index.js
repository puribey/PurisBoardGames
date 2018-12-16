import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gameList: [],
    favouriteGames: [],
    loading: false
  },
  mutations: {
    ADD_REMOVE_FAVOURITE(state, payload) {
      const updatedFavourite = state.gameList.map(game => {
        if (game.id === payload) {
          game.favourite = !game.favourite;
          if (game.favourite == true) {
            state.favouriteGames = [...state.favouriteGames, game];
          } else {
            const index = state.favouriteGames.indexOf(game)
            state.favouriteGames = [
                ...state.favouriteGames.slice(0, index),
                ...state.favouriteGames.slice(index + 1)
            ]
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
    },
    SET_LOADER(state, payload) {
      // eslint-disable-next-line
      console.log(state.loading)
      state.loading = payload;
    }
  },
  actions: {
    updateFavourite({ commit }, payload) {
      commit("ADD_REMOVE_FAVOURITE", payload);
    },
    createGameCard({ commit }, payload) {
      commit('SET_LOADER', true)
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
      let image 
      let key
      firebase
        .database()
        .ref("games")
        .push(game)
        .then( data => {
          const filename = payload.image.name
          const extention = filename.slice(filename.lastIndexOf('.'))
          key = data.key
          return firebase.storage().ref('games/' + key + '.' + extention).put(payload.image)
        })
        .then( fileData => {
          return fileData.ref.getDownloadURL()
          .then( imageSRC => {
            image = imageSRC
            return firebase.database().ref(`games/${key}/src`).set(image)
          })
          .then(() => {
            commit('SET_LOADER', false)
            return commit("CREATE_GAMECARD", {
              ...game,
              src: image,
              id: key
            })
          })
        })
        .catch(error => {
          commit('SET_LOADER', true)
          return error;
        });
    },
    // will call this games in main.js where I load my games
    loadGames({ commit }) {
      commit('SET_LOADER', true)
      firebase
        .database()
        .ref("games")
        .once("value")
        .then(data => {
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
          commit('SET_LOADER', false)
        })
        .catch(error => {
          commit('SET_LOADER', true)
          return error
        });
    }
  },
  getters: {
    getGameList(state) {
      return state.gameList.sort((a,b) => {
          return a.title > b.title ? 1 : -1
      })
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
    },
    getLoader(state) {
      return state.loading;
    }
  }
});
