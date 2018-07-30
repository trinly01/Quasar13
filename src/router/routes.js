
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/todos') },
      { path: 'child', component: () => import('pages/batch13') }
    ]
  },
  {
    path: '/batch13',
    component: () => import('pages/batch13')
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
