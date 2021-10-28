import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    redirect: '/FtvSystem'
  },
  {
    path: '/',
    name: 'FrontEnd',
    component: () => import('@/views/front/FrontEnd'),
    children: [{
        path: 'FtvSystem',
        name: 'FrontHome',
        component: () => import('@/views/front/FrontHome')
      },
      {
        path: 'FtvSystemPage',
        name: 'HomePage',
        component: () => import('@/views/front/FrontHomePage')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
