import type { App } from 'vue';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { RedirectRoute } from '@src/router/base';
import { PageEnum } from '@src/enums/pageEnum';
import { createRouterGuards } from '@src/router/guards';
import type { IModuleType } from '@src/router/types';

const modules = import.meta.glob<IModuleType>('./modules/**/*.ts', { eager: true });

const routeModuleList: RouteRecordRaw[] = Object.keys(modules).reduce(
  (list: RouteRecordRaw[], key) => {
    const mod = modules[key].default ?? {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    return [...list, ...modList];
  },
  []
);

function sortRoute(a: any, b: any) {
  return (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0);
}

routeModuleList.sort(sortRoute);

export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root'
  }
};

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@src/layouts/AuthLayout.vue'),
  meta: {
    title: 'Login'
  },
  children: [
    {
      path: '',
      name: 'login',
      meta: {
        title: 'Login'
      },
      component: () => import('@src/views/login/index.vue')
    }
  ]
};

export const asyncRoutes = [...routeModuleList];

export const constantRouter: RouteRecordRaw[] = [LoginRoute, RootRoute, RedirectRoute];

export const router = createRouter({
  history: createWebHistory(),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

export function setupRouter(app: App) {
  app.use(router);
  createRouterGuards(router);
}
