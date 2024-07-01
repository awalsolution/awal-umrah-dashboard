import type { RouteRecordRaw } from 'vue-router';
import { PeopleCommunityAdd20Regular } from '@vicons/fluent';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'user';

const routes: RouteRecordRaw[] = [
  {
    path: '/user',
    name: routeName,
    redirect: '/user/list',
    component: DashboardLayout,
    meta: {
      title: 'User',
      icon: renderIcon(PeopleCommunityAdd20Regular),
      permissions: ['user menu'],
      sort: 6
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'User List',
          permissions: ['user menu']
        },
        component: () => import('@src/views/user/index.vue')
      },
      {
        path: 'profile',
        name: `${routeName}_profile`,
        meta: {
          title: 'Profile',
          permissions: ['user profile'],
          hidden: true
        },
        component: () => import('@src/views/user/Profile.vue')
      },
      {
        path: 'assign-permission/:userId',
        name: `${routeName}_assign_permission`,
        meta: {
          title: 'Assing Permission',
          permissions: ['user assign permission'],
          hidden: true
        },
        component: () => import('@src/components/permission/AssignPermissions.vue')
      }
    ]
  }
];

export default routes;
