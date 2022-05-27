

const routes = [
  { path: '/',
    meta: { title: 'Home' },
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/quiz/:n',
    meta: { title: 'Quiz' },
    component: () => import('@/views/Quiz.vue'),
  },
  { path: '/:path(.*)',
  component: () => import('@/views/NotFound.vue')
  },
]

export default routes
