import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/lancamentos',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/lancamento/LancamentoPage.vue') }],
  },

  {
    path: '/clientes',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/cliente/ClientePage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
