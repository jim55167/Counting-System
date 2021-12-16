import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//https://elect.ftv.com.tw/monitor/FtvSystem
const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    redirect: '/FtvSystem'
  },
  // {
  //   path: '/monitor',
  //   name: 'monitor',
  //   component: () => import('@/views/FrontEnd')
  // },
  {
    path: '/',
    name: 'FrontEnd',
    component: () => import('@/views/FrontEnd'),
    children: [
      {
        path: 'FtvSystem',
        name: 'FrontHome',
        component: () => import('@/views/FrontHome')
      },
      {
        path: 'FtvSystemPage2',
        name: 'HomePage2',
        component: () => import('@/views/FrontHomePage2')
      },
      {
        path: 'FtvSystemPage3',
        name: 'HomePage3',
        component: () => import('@/views/FrontHomePage3')
      },
      {
        path: 'FtvSystemPage4',
        name: 'HomePage4',
        component: () => import('@/views/FrontHomePage4')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/monitor',
  routes,
})

export default router
