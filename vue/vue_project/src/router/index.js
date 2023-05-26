import Vue from 'vue'
import VueRouter from 'vue-router'
import TopPage from '@/views/TopPage'
import SamplePage from '@/views/SamplePage'
import PracticePage from '@/views/PracticePage'
import OldVueToDo from '@/views/OldVueToDo'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'TopPage',
    component: TopPage
  },
  {
    path: '/sample',
    name: 'SamplePage',
    component: SamplePage
  },
  {
    path: '/practice',
    name: 'PracticePage',
    component: PracticePage
  },
  {
    path: '/oldtodo',
    name: 'OldVueToDo',
    component: OldVueToDo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
