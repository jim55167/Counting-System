import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/taipei1',
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
    children: [
      {
        path: "taipei1",
        component: () => import('@/components/filter/Taipei1')
      },
      {
        path: "taipei2",
        component: () => import('@/components/filter/Taipei2')
      },
      {
        path: "taichung1",
        component: () => import('@/components/filter/Taichung1')
      },
      {
        path: "taichung2",
        component: () => import('@/components/filter/Taichung2')
      }
    ]
  },
  // {
  //   path: '/:id',
  //   name: 'RouterAlive',
  //   component: () => import('@/views/Home'),
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
