<template>
  <div class="mb-5">
    <n-grid cols="1 s:2 m:3 l:8 xl:8 2xl:8" responsive="screen" :x-gap="16" :y-gap="8">
      <n-grid-item v-for="(item, index) in dataList" :key="index">
        <NCard content-style="padding-top: 0;" size="small" :bordered="false">
          <template #footer>
            <n-skeleton v-if="loading" size="medium" />
            <div class="cursor-pointer" v-else>
              <p class="flex justify-center">
                <span>
                  <n-icon :size="item.size" class="flex-1" :color="item.color">
                    <component :is="item.icon" v-on="item.eventObject || {}" />
                  </n-icon>
                </span>
              </p>
              <p class="flex justify-between">
                <span>{{ item.title }}</span>
                <span>{{ item.data.value.length }}</span>
              </p>
            </div>
          </template>
        </NCard>
      </n-grid-item>
    </n-grid>
    <div class="flex justify-center py-3">
      <div
        class="text-white text-2xl p-3 rounded bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% font-bold"
      >
        Organization Details Information
      </div>
    </div>
    <n-space :vertical="true">
      <n-card title="Role list">
        <template #header-extra>
          <button
            type="button"
            class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2 text-center"
            @click="
              router.push({
                name: 'organization_insert_role',
                params: { db_name: route.params.db_name }
              })
            "
          >
            Insert Role
          </button>
        </template>
        <div class="table_content_container">
          <table class="table">
            <thead class="head">
              <tr>
                <th class="th">Role Name</th>
                <th
                  class="th text-center"
                  v-permission="{
                    action: ['tenant update', 'tenant delete']
                  }"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="roles.length === 0">
                <td colspan="6" class="data_placeholder">Record Not Exist</td>
              </tr>
              <tr v-else v-for="item in roles" :key="item.id" class="body_tr">
                <td v-if="item.name" class="td">{{ item.name }}</td>
                <td
                  class="td flex gap-3 justify-center"
                  v-permission="{
                    action: ['tenant update', 'tenant delete']
                  }"
                >
                  <button
                    type="button"
                    class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded text-sm px-5 py-2 text-center"
                    @click="
                      router.push({
                        name: 'organization_edit_role',
                        params: { db_name: route.params.db_name, role_id: item.id }
                      })
                    "
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l font-medium rounded text-sm px-5 py-2 text-center"
                    @click="roleConfirmationDialog(item)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </n-card>
      <n-card title="User list">
        <div class="table_content_container">
          <table class="table">
            <thead class="head">
              <tr>
                <th class="th">Name</th>
                <th class="th">Email</th>
                <th class="th">Phone Number</th>
                <th class="th">Role</th>
                <th class="th">Status</th>
                <th
                  class="th text-center"
                  v-permission="{
                    action: ['tenant update', 'tenant delete']
                  }"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="users.length === 0">
                <td colspan="6" class="data_placeholder">Record Not Exist</td>
              </tr>
              <tr v-else v-for="item in users" :key="item.id" class="body_tr">
                <td v-if="item.profile" class="td">
                  {{ item.profile.first_name + ' ' + item.profile.last_name }}
                </td>
                <td v-if="item.email" class="td">{{ item.email }}</td>
                <td v-if="item.profile" class="td">{{ item.profile.phone_number }}</td>
                <td class="td" v-for="role in item.roles" :key="role.id">{{ role.name }}</td>
                <td class="td text-center">
                  <n-tag :bordered="false" :type="item.status === 'disabled' ? 'error' : 'info'">
                    {{ item.status === 1 ? 'Active' : 'Disable' }}
                  </n-tag>
                </td>
                <td
                  class="td flex gap-3 justify-center"
                  v-permission="{
                    action: ['tenant update', 'tenant delete']
                  }"
                >
                  <button
                    type="button"
                    class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded text-sm px-5 py-2 text-center"
                    @click="
                      router.push({
                        name: 'organization_edit_user',
                        params: { db_name: route.params.db_name, user_id: item.id }
                      })
                    "
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </n-card>
      <n-card title="Permission list">
        <template #header-extra>
          <button
            type="button"
            class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2 text-center"
            @click="
              router.push({
                name: 'organization_insert_permission',
                params: { db_name: route.params.db_name }
              })
            "
          >
            Insert Permissions
          </button>
        </template>
        <div class="table_content_container">
          <table class="table">
            <thead class="head">
              <tr>
                <th class="th">Permission Name</th>
                <th
                  class="th text-center"
                  v-permission="{
                    action: ['tenant update', 'tenant delete']
                  }"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="permissions.length === 0">
                <td colspan="6" class="data_placeholder">Record Not Exist</td>
              </tr>
              <tr v-else v-for="item in permissions" :key="item.id" class="body_tr">
                <td v-if="item.name" class="td">{{ item.name }}</td>
                <td
                  class="td flex gap-3 justify-center"
                  v-permission="{
                    action: ['tenant update', 'tenant delete']
                  }"
                >
                  <button
                    type="button"
                    class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l font-medium rounded text-sm px-5 py-2 text-center"
                    @click="permissionConfirmationDialog(item)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </n-card>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDialog } from 'naive-ui';
import { UsergroupAddOutlined } from '@vicons/antd';
import { LockOpen16Regular, PersonLock24Regular } from '@vicons/fluent';
import { deleteRecordApi } from '@src/api/endpoints';
import { getRecordApi } from '@src/api/endpoints';

const route = useRoute();
const router = useRouter();
const permissions: Ref = ref([]);
const users: Ref = ref([]);
const roles: Ref = ref([]);
const dialog = useDialog();
const selectedId: Ref = ref();
const loading: Ref = ref(true);

const getList = () => {
  getRecordApi('/tenant/find-single-tenant-details', { db_name: route.params.db_name }).then(
    (res: any) => {
      permissions.value = res.data?.permissions;
      users.value = res.data?.users;
      roles.value = res.data?.roles;
    }
  );
};

onMounted(() => {
  getList();
  loading.value = false;
});

function roleConfirmationDialog(item: { id: number }) {
  selectedId.value = item.id;
  dialog.error({
    title: 'Confirmation',
    content: () => 'Are you sure you want to delete?',
    positiveText: 'Delete',
    negativeText: 'Cancel',
    onPositiveClick: deleteTenantRoleOperation
  });
}

function deleteTenantRoleOperation() {
  deleteRecordApi(`/tenant/delete-role-of-tenant`, {
    role_id: selectedId.value,
    db_name: route.params.db_name
  })
    .then((res: any) => {
      window['$message'].success(res.message);
      getList();
      dialog.destroyAll;
    })
    .catch((res: any) => {
      window['$message'].error(res.message);
      dialog.destroyAll;
    });
  selectedId.value = null;
}

function permissionConfirmationDialog(item: { id: number }) {
  selectedId.value = item.id;
  dialog.error({
    title: 'Confirmation',
    content: () => 'Are you sure you want to delete?',
    positiveText: 'Delete',
    negativeText: 'Cancel',
    onPositiveClick: deleteTenantPermissionOperation
  });
}

function deleteTenantPermissionOperation() {
  deleteRecordApi(`/tenant/delete-permission-of-tenant/${selectedId.value}`, {
    db_name: route.params.db_name
  })
    .then((res: any) => {
      window['$message'].success(res.message);
      getList();
      dialog.destroyAll;
    })
    .catch((res: any) => {
      window['$message'].error(res.message);
      dialog.destroyAll;
    });
  selectedId.value = null;
}

// data list
const dataList = [
  {
    icon: UsergroupAddOutlined,
    size: '32',
    title: 'Users',
    data: users,
    color: '#69c0ff',
    eventObject: {
      click: () => {}
    }
  },
  {
    icon: LockOpen16Regular,
    size: '32',
    title: 'Permissions',
    color: '#69c0ff',
    data: permissions,
    eventObject: {
      click: () => {}
    }
  },
  {
    icon: PersonLock24Regular,
    size: '32',
    title: 'Roles',
    data: roles,
    color: '#ff9c6e',
    eventObject: {
      click: () => {}
    }
  }
];
</script>

<style lang="scss" scoped>
.table_content_container {
  @apply relative overflow-x-auto border border-gray-200 dark:border-gray-800 mt-3;
}
.table {
  @apply w-full text-sm text-left text-gray-500 dark:text-gray-400;
}
.head {
  @apply sticky top-0 text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 z-20;
}
.th {
  @apply px-3 py-3 border-r border-b border-gray-200 dark:border-gray-800  whitespace-nowrap;
}
.body_tr {
  @apply hover:bg-gray-50 dark:hover:bg-gray-600;
}
.td {
  @apply px-3 py-3 border-r border-b border-gray-200 dark:border-gray-800 whitespace-nowrap;
}
.sticky_el {
  @apply sticky bg-gray-50 dark:bg-gray-700 px-6 whitespace-nowrap text-center border border-gray-200 dark:border-gray-800;
}
.data_placeholder {
  text-align: center;
  color: gray;
  padding: 20px 0;
  font-size: 18px;
  font-style: italic;
}
</style>
