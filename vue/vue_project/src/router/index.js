import Vue from 'vue'
import VueRouter from 'vue-router'
import TopPage from '@/views/TopPage'
import SamplePage from '@/views/SamplePage'
import PracticePage from '@/views/PracticePage'
import OldVueHomePage from '@/views/OldVueHomePage'
import OldVueIndexPage from '@/views/OldVueIndexPage'
import OldVueNewPage from '@/views/OldVueNewPage'

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
    name: 'OldVueHome',
    component: OldVueHomePage
  },
  {
    path: '/oldtodo/index',
    name: 'OldVueIndex',
    component: OldVueIndexPage
  },
  {
    path: '/oldtodo/index/new',
    name: 'OldVueNew',
    component: OldVueNewPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
