import type { RouteRecordRaw } from 'vue-router';
import { DashboardLayout } from '@src/router/constant';
import { Hotel } from '@vicons/fa';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'hotel';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/hotel',
    name: routeName,
    redirect: '/hotel/list',
    component: DashboardLayout,
    meta: {
      title: 'Hotels',
      icon: renderIcon(Hotel),
      permissions: ['hotel menu'],
      sort: 4
    },
    children: [
      {
        path: 'List',
        name: `${routeName}_list`,
        meta: {
          title: 'Hotel List',
          permissions: ['hotel menu']
        },
        component: () => import('@src/views/hotel/index.vue')
      },
      {
        path: 'add',
        name: `${routeName}_add`,
        meta: {
          title: 'Add Hotel',
          permissions: ['hotel create'],
          hidden: true
        },
        component: () => import('@src/components/hotel/AddHotel.vue')
      },
      {
        path: 'update/:id',
        name: `${routeName}_update`,
        meta: {
          title: 'Update hotel',
          permissions: ['hotel update'],
          hidden: true
        },
        component: () => import('@src/components/hotel/EditHotel.vue')
      },
      {
        path: 'room',
        name: `${routeName}_room`,
        meta: {
          title: 'Room List',
          permissions: ['room menu']
        },
        component: () => import('@src/views/room/index.vue')
      }
    ]
  }
];

export default routes;
