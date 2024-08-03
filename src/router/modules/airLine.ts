import type { RouteRecordRaw } from 'vue-router';
import { Airplane20Regular } from '@vicons/fluent';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'airLine';

const routes: RouteRecordRaw[] = [
  {
    path: '/air-line',
    name: routeName,
    redirect: '/air-line/list',
    component: DashboardLayout,
    meta: {
      title: 'Air Line',
      icon: renderIcon(Airplane20Regular),
      permissions: ['air line menu'],
      sort: 2
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Air Line List',
          permissions: ['air line menu']
        },
        component: () => import('@src/views/air-line/index.vue')
      }
    ]
  }
];

export default routes;
