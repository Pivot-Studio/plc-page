import { createRouter, createWebHistory } from 'vue-router';

export const routes = [
  {
    path: '/',
    component: () => import('@/pages/index.vue'),
  },
];

const route = createRouter({
  history: createWebHistory(),
  routes,
});

export default route;
