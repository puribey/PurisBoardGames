import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gameList: [
      {
        id: 1,
        favourite: false,
        title: "Citadels",
        src:
          "https://cf.geekdo-images.com/opengraph/img/FJ13Z29rnnQTDBTG6UMv_X_IuJs=/fit-in/1200x630/pic3239104.jpg",
        description: "In Stefan Feld's new game The Oracle of Delphi, the player's ships travel across a large variable game board of hexagonal tiles showing islands and the surrounding waters. Each player aims to reach certain islands to perform the twelve tasks given by Zeus. Rolling the dice (at the start of the turn) is equivalent to consulting the oracle, whereas the results represent her answers. The answers determine which actions you will be able to take, but you will always have three actions per turn. However, a slight divergence from your fate is often possible. In addition to the oracle, you can request support from the gods and you can acquire favor tokens, companions, and other special abilities that will help you win the race against other competitors. Differently equipped ships and the variable set-up of the game board will offer new challenging and interesting strategic and tactical decisions with every new game of The Oracle of Delphi that you play.",
        value: 3,
        type: "Party",
        details: {"Edad":"+12", "Cantidad de jugadores":"2-4 jugadores", "Duración":"90-120min"}
      },
      {
        id: 2,
        favourite: false,
        title: "Russian Railroads",
        src:
          "http://www.cephalofair.com/wp-content/uploads/2014/05/russian_railroads.jpg",
        description: "In Russian Railroads, players compete in an exciting race to build the largest and most advanced railway network. In order to do so, the players appoint their workers to various important tasks. The development of simple tracks will quickly bring the players to important places, while the modernization of their railway network will improve the efficiency of their machinery. Newer locomotives cover greater distances and factories churn out improved technology. Engineers, when used effectively, can be the extra boost that an empire needs to race past the competition. There are many paths to victory: Who will ride into the future full steam ahead and who will be run off the rails? Whose empire will overcome the challenges ahead and emerge victorious?",
        value: 5,
        type: "Worker Placement"
      }
      ,
      {
        id: 3,
        favourite: false,
        title: "Abyss",
        src:
          "http://www.cephalofair.com/wp-content/uploads/2014/05/russian_railroads.jpg",
        description: "In Russian Railroads, players compete in an exciting race to build the largest and most advanced railway network. In order to do so, the players appoint their workers to various important tasks. The development of simple tracks will quickly bring the players to important places, while the modernization of their railway network will improve the efficiency of their machinery. Newer locomotives cover greater distances and factories churn out improved technology. Engineers, when used effectively, can be the extra boost that an empire needs to race past the competition. There are many paths to victory: Who will ride into the future full steam ahead and who will be run off the rails? Whose empire will overcome the challenges ahead and emerge victorious?",
        value: 5,
        type: "Worker Placement"
      }
    ],
    favouriteGames:[]
  },
  mutations: {
    ADD_REMOVE_FAVOURITE(state, payload){
      const updatedFavourite = state.gameList.map( game => {
        if (game.id === payload){
          game.favourite = !game.favourite
          if(game.favourite === true){
            state.favouriteGames = [...state.favouriteGames, game]
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
      state.gameList = updatedFavourite
    },
    CREATE_GAMECARD(state, payload){
      state.gameList = [...state.gameList, payload]
    }
  },
  actions: {
    updateFavourite({commit}, payload){
      commit("ADD_REMOVE_FAVOURITE", payload)
    },
    createGameCard({commit}, payload){
      const game = {
        id: 4124,
        favourite: false,
        title: payload.title,
        src: payload.src,
        description: payload.description,
        value: payload.value,
        type: payload.type
      }
      // Reach out to firebase and store it 
      commit("CREATE_GAMECARD", game)
    }
  },
  getters: {
    getGameList(state) {
      return state.gameList.sort((a,b) => {
          return a.title > b.title ? 1 : -1
      })
    },
    getGame(state) {
      return (gameID) => {
        return state.gameList.find((game) => {
          return game.id == gameID
        })
      }
    },
    getFavouriteGames(state) {
      return state.favouriteGames
    }
  } 
});
