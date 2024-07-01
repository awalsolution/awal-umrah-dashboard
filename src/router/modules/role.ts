import type { RouteRecordRaw } from 'vue-router';
import { PeopleLock20Regular } from '@vicons/fluent';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'role';

const routes: RouteRecordRaw[] = [
  {
    path: '/role',
    name: routeName,
    redirect: '/role/list',
    component: DashboardLayout,
    meta: {
      title: 'Role',
      icon: renderIcon(PeopleLock20Regular),
      permissions: ['role menu'],
      sort: 7
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Role List',
          permissions: ['role menu']
        },
        component: () => import('@src/views/role/index.vue')
      },
      {
        path: 'assign-permission/:roleId',
        name: `${routeName}_assign_permission`,
        meta: {
          title: 'Assing Permission',
          permissions: ['assign permission menu'],
          hidden: true
        },
        component: () => import('@src/components/permission/AssignPermissions.vue')
      }
    ]
  }
];

export default routes;
