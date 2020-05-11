import Vue from 'vue'
import VueRouter from 'vue-router'
import EBook from '../components/EBook'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/ebook'
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  { path: '/ebook', component: EBook }
]

const router = new VueRouter({
  routes
})

export default router
