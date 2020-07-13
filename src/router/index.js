import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '../views/Login'
import Blog from '../views/Blog'
import BlogDetail from '../views/BlogDetail'
import BlogEdit from '../views/BlogEdit'
Vue.use(Router)

export default new Router({
  mode:'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: HelloWorld
    },
    {
      path: '/index',
      name: 'index',
      redirect: {name: "Blog"}
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/blog/add',
      name: 'BlogAdd',
      component: BlogEdit,
      //登录之后，才可以进入
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/blog/:blogId',
      name: 'BlogDetail',
      component: BlogDetail
    },
    {
      path: '/blog/:blogId/edit',
      name: 'BlogEdit',
      component: BlogEdit,
      meta:{
        requireAuth:true
      }
    }
  ]

})
