import type { RouteRecordRaw } from 'vue-router';
import { CcVisa } from '@vicons/fa';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'visa';

const routes: RouteRecordRaw[] = [
  {
    path: '/visa',
    name: routeName,
    redirect: '/visa/list',
    component: DashboardLayout,
    meta: {
      title: 'Visa',
      icon: renderIcon(CcVisa),
      permissions: ['visa menu'],
      sort: 1
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Visas',
          permissions: ['visa menu']
        },
        component: () => import('@src/views/visa-company/index.vue')
      },
      {
        path: 'visa-companies',
        name: `${routeName}_companies`,
        meta: {
          title: 'Companies',
          permissions: ['visa companies menu']
        },
        component: () => import('@src/views/visa-company/index.vue')
      }
    ]
  }
];

export default routes;
