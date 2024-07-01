import type { RouteRecordRaw } from 'vue-router';
import { DollarCircleOutlined } from '@vicons/antd';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'plan';

const routes: RouteRecordRaw[] = [
  {
    path: '/plan',
    name: routeName,
    redirect: '/plan/list',
    component: DashboardLayout,
    meta: {
      title: 'Plan',
      icon: renderIcon(DollarCircleOutlined),
      permissions: ['plan menu'],
      sort: 5
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Plan List',
          permissions: ['plan menu']
        },
        component: () => import('@src/views/plan/index.vue')
      }
    ]
  }
];

export default routes;
