import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import TopPage from '@/views/TopPage'
import SamplePage from '@/views/SamplePage'
import PracticePage from '@/views/PracticePage'
import OldVueHomePage from '@/views/OldVueHomePage'
import OldVueIndexPage from '@/views/OldVueIndexPage'
import OldVueNewPage from '@/views/OldVueNewPage'
import SignInPage from '@/views/SignIn'
import SignUpPage from '@/views/SignUp'
import Mypage from '@/views/Mypage'
import RailsVuePage from '@/views/RailsVue'

Vue.use(VueRouter)

// ナビゲーションガード
const requireAuth = async (to, from, next) => {
  if (store.getters.isLoggedIn) {
    next(); // ログインしていればそのまま進む
  } else {
    await store.dispatch('setAuthMessage', 'You need to sign in.');
    next('/signin'); // ログインしていなければログインページへリダイレクト
  }
};

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
  },
  {
    path: '/railsvue',
    name: 'RailsVue',
    component: RailsVuePage
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignInPage
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUpPage
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: Mypage,
    beforeEnter: requireAuth
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
