import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditPost from '../views/EditPost.vue'
import addPost from '../views/AddPost.vue'
import Post from '../views/Post.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/add-post',
    name: 'add-post',
    component: addPost
  },
  {
    path: '/post/:id',
    name: 'post',
    component: Post
  },
  {
    path: '/edit-post/:id',
    name: 'edit-post',
    component: EditPost
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
