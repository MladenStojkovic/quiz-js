

const routes = [
  { path: '/',
    meta: { title: 'Home' },
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/quiz/:id',
    meta: { title: 'Quiz' },
    component: () => import('@/views/Quiz.vue'),
  },
  {
    path: '/Results',
    meta: { title: 'Results' },
    component: () => import('@/views/Results.vue'),
  },
  { path: '/:path(.*)',
  component: () => import('@/views/NotFound.vue')
  },
]

export default routes
