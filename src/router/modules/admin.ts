import type { RouteRecordRaw } from 'vue-router';
import { DashboardLayout } from '@src/router/constant';

const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/dashboard',
    meta: {
      title: 'Admin',
      permissions: ['dashboard menu'],
      sort: 2
    },
    children: [
      {
        path: '/organization',
        meta: {
          title: 'Organization',
          icon: 'pi pi-fw pi-bookmark',
          permissions: ['tenant menu']
        },
        children: [
          {
            path: '/organization/list',
            name: 'organization_list',
            meta: {
              title: 'Organization List',
              icon: 'pi pi-fw pi-globe',
              permissions: ['tenant menu']
            },
            component: () => import('@src/views/tenant/index.vue')
          },
          {
            path: '/organization/add',
            name: 'organization_add',
            meta: {
              title: 'Add Organization',
              icon: 'pi pi-fw pi-file',
              permissions: ['create tenant']
            },
            component: () => import('@src/components/tenant/AddTenant.vue')
          },
          {
            path: '/organization/:tenant_id/edit',
            name: 'organization_edit',
            meta: {
              title: 'Edit Organization',
              permissions: ['update tenant'],
              hidden: true
            },
            component: () => import('@src/components/tenant/EditTenant.vue')
          }
        ]
      },
      {
        path: '/organization/profile',
        name: 'tenant_profile',
        meta: {
          title: 'Organization Profile',
          permissions: ['tenant profile'],
          hidden: true
        },
        component: () => import('@src/components/tenant/TenantProfile.vue')
      },
      {
        path: '/user/list',
        name: 'user_list',
        meta: {
          title: 'Users',
          icon: 'pi pi-fw pi-user',
          permissions: ['user menu']
        },
        component: () => import('@src/views/user/index.vue')
      },
      {
        path: '/user/profile',
        name: 'user_profile',
        meta: {
          title: 'User Profile',
          permissions: ['user profile'],
          hidden: true
        },
        component: () => import('@src/views/user/Profile.vue')
      },
      {
        path: '/user/:userId/assign-permission',
        name: 'user_assign_permission',
        meta: {
          title: 'Assing Permission',
          permissions: ['user assign permission'],
          hidden: true
        },
        component: () => import('@src/components/permission/AssignPermissions.vue')
      },
      {
        path: '/permission/list',
        name: 'permission_list',
        meta: {
          title: 'Permissions',
          icon: 'pi pi-fw pi-sign-in',
          permissions: ['permission menu']
        },
        component: () => import('@src/views/permission/index.vue')
      },
      {
        path: '/plan/list',
        name: 'plan_list',
        meta: {
          title: 'Plans',
          icon: 'pi pi-fw pi-check-square',
          permissions: ['plan menu']
        },
        component: () => import('@src/views/plan/index.vue')
      },
      {
        path: '/plan/:planId/assign-permission',
        name: 'plan_assign_permission',
        meta: {
          title: 'Assing Permission',
          permissions: ['plan assign permission'],
          hidden: true
        },
        component: () => import('@src/components/permission/AssignPermissions.vue')
      },
      {
        path: '/role/list',
        name: 'role_list',
        meta: {
          title: 'Roles',
          icon: 'pi pi-fw pi-lock',
          permissions: ['role menu']
        },
        component: () => import('@src/views/role/index.vue')
      },
      {
        path: '/role/:roleId/assign-permission',
        name: 'role_assign_permission',
        meta: {
          title: 'Assing Permission',
          permissions: ['role assign permission'],
          hidden: true
        },
        component: () => import('@src/components/permission/AssignPermissions.vue')
      },
      {
        path: '/menu/list',
        name: 'menu_list',
        meta: {
          title: 'Menus',
          icon: 'pi pi-fw pi-objects-column',
          permissions: ['menu menu']
        },
        component: () => import('@src/views/menu/index.vue')
      }
    ]
  }
];

export default routes;
