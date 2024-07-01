import type { RouteRecordRaw } from 'vue-router';
import { Organization16Regular } from '@vicons/fluent';
import { DashboardLayout } from '@src/router/constant';
import { renderIcon } from '@src/utils/renderIcon';

const routeName = 'organization';

const routes: RouteRecordRaw[] = [
  {
    path: '/organization',
    name: routeName,
    redirect: '/organization/list',
    component: DashboardLayout,
    meta: {
      title: 'Organization',
      icon: renderIcon(Organization16Regular),
      permissions: ['tenant menu'],
      sort: 1
    },
    children: [
      {
        path: 'list',
        name: `${routeName}_list`,
        meta: {
          title: 'Organization List',
          permissions: ['tenant menu']
        },
        component: () => import('@src/views/tenant/index.vue')
      },
      {
        path: 'add',
        name: `${routeName}_add`,
        meta: {
          title: 'Add Organization',
          permissions: ['create tenant']
        },
        component: () => import('@src/components/tenant/AddTenant.vue')
      },
      {
        path: 'edit/:id',
        name: `${routeName}_edit`,
        meta: {
          title: 'Edit Organization',
          permissions: ['update tenant'],
          hidden: true,
          dismissTab: true
        },
        component: () => import('@src/components/tenant/EditTenant.vue')
      },
      {
        path: 'organization-details/:db_name',
        name: `${routeName}_details`,
        meta: {
          title: 'View Organization',
          permissions: ['view tenant'],
          hidden: true,
          dismissTab: true
        },
        component: () => import('@src/components/tenant/TenantDetails.vue')
      },
      // admin to tenant user operations
      {
        path: 'edit-user-of-organization/:db_name/:user_id',
        name: `${routeName}_edit_user`,
        meta: {
          title: 'Edit User',
          permissions: ['update tenant'],
          hidden: true,
          dismissTab: true
        },
        component: () => import('@src/components/tenant/EditUserOfTenant.vue')
      },
      // admin to tenant roles operations
      {
        path: 'insert-roles-of-organization/:db_name',
        name: `${routeName}_insert_role`,
        meta: {
          title: 'Insert Role',
          permissions: ['update tenant'],
          hidden: true,
          dismissTab: true
        },
        component: () => import('@src/components/tenant/InsertRolesOfTenant.vue')
      },
      {
        path: 'edit-role-of-organization/:db_name/:role_id',
        name: `${routeName}_edit_role`,
        meta: {
          title: 'Edit Role',
          permissions: ['update tenant'],
          hidden: true,
          dismissTab: true
        },
        component: () => import('@src/components/tenant/AssignPermissionToTenantRole.vue')
      },
      // admin to tenant permission operations
      {
        path: 'insert-permissions-of-organization/:db_name',
        name: `${routeName}_insert_permission`,
        meta: {
          title: 'Insert Permissions',
          permissions: ['update tenant'],
          hidden: true,
          dismissTab: true
        },
        component: () => import('@src/components/tenant/InsertPermissionsOfTenant.vue')
      }
    ]
  }
];

export default routes;
