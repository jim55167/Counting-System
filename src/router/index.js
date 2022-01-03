import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    redirect: '/taipei1',
  },
  {
    path: '/',
    name: 'FrontEnd',
    component: () => import('@/views/FrontEnd'),
    children: [
      {
        path: 'taipei1',
        name: 'taipei1',
        component: () => import('@/views/taipei1'),
        meta: {
          title: '林昶佐罷免案一'
        }
      },
      {
        path: 'taipei2',
        name: 'taipei2',
        component: () => import('@/views/taipei2'),
        meta: {
          title: '林昶佐罷免案二'
        }
      },
      {
        path: 'taichung1',
        name: 'taichung1',
        component: () => import('@/views/taichung1'),
        meta: {
          title: '台中二選區補選一'
        }
      },
      {
        path: 'taichung2',
        name: 'taichung2',
        component: () => import('@/views/taichung2'),
        meta: {
          title: '台中二選區補選二'
        }
      }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes,
})

export default router
