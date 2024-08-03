import type { RouteRecordRaw } from 'vue-router';
import { CartOutline } from '@vicons/ionicons5';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'booking';

const routes: RouteRecordRaw[] = [
  {
    path: '/booking',
    name: routeName,
    redirect: '/booking/list',
    component: DashboardLayout,
    meta: {
      title: 'Bookings',
      icon: renderIcon(CartOutline),
      permissions: ['booking menu'],
      sort: 4
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Booking List',
          permissions: ['booking menu']
        },
        component: () => import('@src/views/booking/index.vue')
      },
      {
        path: 'add',
        name: `${routeName}_add`,
        meta: {
          title: 'Add booking',
          permissions: ['booking create']
        },
        component: () => import('@src/components/booking/AddBooking.vue')
      },
      {
        path: 'edit/:id',
        name: `${routeName}_edit`,
        meta: {
          title: 'Edit booking',
          permissions: ['booking update'],
          hidden: true
        },
        component: () => import('@src/components/booking/EditBooking.vue')
      },
      {
        path: 'print/:id',
        name: `${routeName}_print`,
        meta: {
          title: 'Print booking',
          permissions: ['booking print'],
          hidden: true
        },
        component: () => import('@src/components/booking/PrintBooking.vue')
      }
    ]
  }
];

export default routes;
