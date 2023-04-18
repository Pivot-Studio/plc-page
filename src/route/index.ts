import { createRouter, createWebHashHistory } from 'vue-router';

export const routes = [
  {
    path: '/',
    component: () => import('@/pages/index.vue'),
  },
];

const route = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default route;
