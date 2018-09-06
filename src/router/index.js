import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import MyList from '@/components/MyList'
import GameCard from '@/components/GameCard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/myList',
      name: 'MyList',
      component: MyList
    },
    {
      path: '/gameCard/:id',
      name: 'GameCard',
      props: true,
      component: GameCard
    },
  ],
  mode: 'history'
})
