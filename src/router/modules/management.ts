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
        path: '/agencies',
        meta: {
          title: 'Agencies',
          icon: 'pi pi-fw pi-bookmark',
          permissions: ['agency menu']
        },
        children: [
          {
            path: '/agencies/list',
            name: 'agencies_lis',
            meta: {
              title: 'Agencies List',
              permissions: ['agency menu']
            },
            component: () => import('@src/views/agencies/index.vue')
          }
        ]
      },
      {
        path: '/booking',
        meta: {
          title: 'Bookings',
          icon: 'pi pi-fw pi-bookmark',
          permissions: ['booking menu']
        },
        children: [
          {
            path: '/booking',
            name: 'booking',
            meta: {
              title: 'Booking',
              icon: 'pi pi-user',
              permissions: ['booking menu']
            },
            component: () => import('@src/views/booking/index.vue')
          },
          {
            path: 'add',
            name: 'booking_add',
            meta: {
              title: 'Add booking',
              permissions: ['booking create']
            },
            component: () => import('@src/components/booking/AddBooking.vue')
          },
          {
            path: 'edit/:id',
            name: 'booking_edit',
            meta: {
              title: 'Edit booking',
              permissions: ['booking update'],
              hidden: true
            },
            component: () => import('@src/components/booking/EditBooking.vue')
          },
          {
            path: 'print/:id',
            name: 'booking_print',
            meta: {
              title: 'Print booking',
              permissions: ['booking print'],
              hidden: true
            },
            component: () => import('@src/components/booking/PrintBooking.vue')
          }
        ]
      },
      {
        path: '/hotel',
        meta: {
          title: 'Hotels',
          icon: 'pi pi-fw pi-bookmark',
          permissions: ['hotel menu'],
          sort: 4
        },
        children: [
          {
            path: '/hotel/list',
            name: `hotel_list`,
            meta: {
              title: 'Hotel List',
              permissions: ['hotel menu']
            },
            component: () => import('@src/views/hotel/index.vue')
          },
          {
            path: '/hotel/add',
            name: `hotel_add`,
            meta: {
              title: 'Add Hotel',
              permissions: ['hotel create'],
              hidden: true
            },
            component: () => import('@src/components/hotel/AddHotel.vue')
          },
          {
            path: '/hotel/edit/:id',
            name: `hotel_edit`,
            meta: {
              title: 'Edit hotel',
              permissions: ['hotel update'],
              hidden: true
            },
            component: () => import('@src/components/hotel/EditHotel.vue')
          },
          {
            path: '/hotel/rooms',
            name: `hotel_rooms`,
            meta: {
              title: 'Room List',
              permissions: ['room menu']
            },
            component: () => import('@src/views/room/index.vue')
          }
        ]
      },
      {
        path: '/visa',
        meta: {
          title: 'Visa',
          icon: 'pi pi-fw pi-bookmark',
          permissions: ['visa menu']
        },
        children: [
          {
            path: '/visa/list',
            name: `visa_list`,
            meta: {
              title: 'Visas',
              permissions: ['visa menu']
            },
            component: () => import('@src/views/visa-company/index.vue')
          },
          {
            path: '/visa/companies',
            name: `visa_companies_list`,
            meta: {
              title: 'Companies',
              permissions: ['visa companies menu']
            },
            component: () => import('@src/views/visa-company/index.vue')
          }
        ]
      },
      {
        path: '/air-line',
        meta: {
          title: 'Air Line',
          icon: 'pi pi-fw pi-bookmark',
          permissions: ['air line menu']
        },
        children: [
          {
            path: '/air-line/list',
            name: `air_line_list`,
            meta: {
              title: 'Air Line List',
              permissions: ['air line menu']
            },
            component: () => import('@src/views/air-line/index.vue')
          }
        ]
      }
    ]
  }
];

export default routes;
