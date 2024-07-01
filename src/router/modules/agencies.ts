import type { RouteRecordRaw } from 'vue-router';
import { PeopleCommunityAdd20Regular } from '@vicons/fluent';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'agencies';

const routes: RouteRecordRaw[] = [
  {
    path: '/agencies',
    name: routeName,
    redirect: '/agencies/list',
    component: DashboardLayout,
    meta: {
      title: 'Agencies',
      icon: renderIcon(PeopleCommunityAdd20Regular),
      permissions: ['agencies menu'],
      sort: 1
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Agencies List',
          permissions: ['agency menu']
        },
        component: () => import('@src/views/agencies/index.vue')
      }
    ]
  }
];

export default routes;
