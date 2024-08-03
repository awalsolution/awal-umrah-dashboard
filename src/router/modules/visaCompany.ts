import type { RouteRecordRaw } from 'vue-router';
import { PeopleCommunityAdd20Regular } from '@vicons/fluent';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'visaCompany';

const routes: RouteRecordRaw[] = [
  {
    path: '/visa-company',
    name: routeName,
    redirect: '/visa-company/list',
    component: DashboardLayout,
    meta: {
      title: 'visa Company',
      icon: renderIcon(PeopleCommunityAdd20Regular),
      permissions: ['visa company menu'],
      sort: 1
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Visa Company List',
          permissions: ['visa company menu']
        },
        component: () => import('@src/views/visa-company/index.vue')
      }
    ]
  }
];

export default routes;
