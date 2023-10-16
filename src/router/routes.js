import bansosRoutes from "./modules/bansosRoutes"
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        name: 'overview', 
        menuText:'Overview', 
        icon: 'mdi-view-dashboard', 
        component: () => import('pages/Overview.vue'),
        meta: {
          requiresAuth: true,
          title: 'Overview',
          breadCrumbs: [
            { text: 'Overview' },
          ]
        },
      },
      ...bansosRoutes
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
