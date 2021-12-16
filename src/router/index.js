import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '*',
    redirect: '/'
  },
  {
    path: '/monitor',
    name: 'monitor',
    component: () => import('@/views/FrontHome')
  },
  {
    path: '/monitor',
    name: 'FrontEnd',
    component: () => import('@/views/FrontEnd'),
    children: [{
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
  routes
})

export default router
