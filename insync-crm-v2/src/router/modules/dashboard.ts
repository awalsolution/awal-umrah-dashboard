import { RouteRecordRaw } from 'vue-router';
import {
  DocumentSync24Regular,
  TagLock32Regular,
  DocumentArrowRight20Regular,
} from '@vicons/fluent';
import {
  DashboardOutlined,
  BarChartOutlined,
  UserOutlined,
  UnlockOutlined,
  FileSyncOutlined,
} from '@vicons/antd';

export const DashboardRoute: RouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  redirect: '/dashboard',
  component: () => import('@src/layouts/DashbaordLayout/index.vue'),
  children: [
    {
      path: '',
      name: 'dashbaord',
      meta: {
        title: 'Dashboard',
        icon: DashboardOutlined,
        permissions: ['can view dashboard'],
      },
      component: () => import('@src/views/dashboard/index.vue'),
    },
    {
      path: 'system/users',
      name: 'users',
      meta: {
        title: 'Users',
        icon: UserOutlined,
        permissions: ['can view users'],
        // disableAuth: true,
      },
      component: () => import('@src/views/users/index.vue'),
    },
    {
      path: 'system/user/profile',
      name: 'user_profile',
      meta: {
        title: 'Profile',
        icon: UserOutlined,
        // hidden: true,
      },
      component: () => import('@src/views/users/Profile.vue'),
    },
    {
      path: 'system/user/shop-setting',
      name: 'user_shop',
      meta: {
        title: 'Shop Setting',
        icon: UserOutlined,
      },
      component: () => import('@src/views/users/UserShop.vue'),
    },
    {
      path: 'system/permissions',
      name: 'permissions',
      meta: {
        title: 'Permissions',
        icon: TagLock32Regular,
        permissions: ['can view permissions'],
      },
      component: () => import('@src/views/permissions/index.vue'),
    },
    {
      path: 'system/roles',
      name: 'roles',
      meta: {
        title: 'Roles',
        icon: UnlockOutlined,
        permissions: ['can view roles'],
      },
      component: () => import('@src/views/roles/index.vue'),
    },
    {
      path: '/dashboard/system/assing-permission',
      name: 'assing-permission',
      meta: {
        title: 'Assign Permissions',
        icon: UnlockOutlined,
      },
      component: () => import('@src/components/permission/AssignPermissions.vue'),
    },
    {
      path: 'system/menus',
      name: 'menus',
      meta: {
        title: 'Menus',
        icon: DashboardOutlined,
      },
      component: () => import('@src/views/menu/index.vue'),
    },
    {
      path: 'shops',
      name: 'shops',
      meta: {
        title: 'Shops',
        icon: BarChartOutlined,
        permissions: ['can view shop'],
      },
      component: () => import('@src/views/shop/index.vue'),
    },
    {
      path: 'products/list',
      name: 'product_list',
      meta: {
        title: 'Product',
        icon: FileSyncOutlined,
        permissions: ['can view products'],
      },
      component: () => import('@src/views/products/index.vue'),
    },
    {
      path: 'product/add',
      name: 'product_add',
      meta: {
        title: 'Add Product',
        icon: DocumentArrowRight20Regular,
        permissions: ['can view add product'],
      },
      component: () => import('@src/components/products/AddProduct.vue'),
    },
    {
      path: 'product/update/:id',
      name: 'product_update',
      meta: {
        title: 'Edit Product',
        permissions: ['can view edit product'],
      },
      component: () => import('@src/components/products/EditProduct.vue'),
    },
    {
      path: 'product/attributes',
      name: 'product_attributes',
      meta: {
        title: 'Product Attributes',
        icon: DocumentArrowRight20Regular,
        permissions: ['can view edit product'],
      },
      component: () => import('@src/views/products/attributes/index.vue'),
    },
    {
      path: 'product/categories',
      name: 'product_categories',
      meta: {
        title: 'Edit Variant',
        icon: DocumentSync24Regular,
        permissions: ['can view edit product'],
      },
      component: () => import('@src/views/products/categories/index.vue'),
    },
  ],
};