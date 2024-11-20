import type { RouteRecordRaw } from 'vue-router';
import { DashboardLayout } from '@src/router/constant';

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    component: DashboardLayout,
    redirect: '/dashboard',
    meta: {
      title: 'Management',
      permissions: ['management menu'],
      sort: 2
    },
    children: [
      {
        path: '/booking',
        meta: {
          title: 'Bookings',
          icon: 'pi pi-address-book',
          permissions: ['booking menu']
        },
        children: [
          {
            path: '/booking',
            name: 'booking',
            meta: {
              title: 'Booking List',
              icon: 'pi pi-file-edit',
              permissions: ['booking menu']
            },
            component: () => import('@src/views/booking/index.vue')
          },
          {
            path: '/booking/add',
            name: 'booking_add',
            meta: {
              title: 'Add booking',
              permissions: ['booking create']
            },
            component: () => import('@src/components/booking/AddBooking.vue')
          }
          // {
          //   path: 'edit/:id',
          //   name: 'booking_edit',
          //   meta: {
          //     title: 'Edit booking',
          //     permissions: ['booking update'],
          //     hidden: true
          //   },
          //   component: () => import('@src/components/booking/EditBooking.vue')
          // },
          // {
          //   path: 'print/:id',
          //   name: 'booking_print',
          //   meta: {
          //     title: 'Print booking',
          //     permissions: ['booking print'],
          //     hidden: true
          //   },
          //   component: () => import('@src/components/booking/PrintBooking.vue')
          // }
        ]
      }
    ]
  }
];

export default routes;
