import type { RouteRecordRaw } from 'vue-router';
import { UnlockOutlined } from '@vicons/antd';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'permission';

const routes: RouteRecordRaw[] = [
  {
    path: '/permission',
    name: routeName,
    redirect: '/permission/list',
    component: DashboardLayout,
    meta: {
      title: 'Permission',
      icon: renderIcon(UnlockOutlined),
      permissions: ['permission menu'],
      sort: 8
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Permission List',
          permissions: ['permission menu']
        },
        component: () => import('@src/views/permission/index.vue')
      }
    ]
  }
];

export default routes;
