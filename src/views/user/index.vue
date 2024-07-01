<template>
  <n-space :vertical="true">
    <n-card title="User List">
      <template #header-extra>
        <NButton
          secondary
          type="info"
          size="small"
          @click="showModal = true"
          v-permission="{ action: ['user create'] }"
        >
          Add User
        </NButton>
      </template>
      <div class="flex flex-col gap-2 lg:flex-row w-full">
        <n-input
          v-model:value="searchParams.name"
          clearable
          placeholder="Search by name"
          size="small"
          type="text"
        >
          <template #prefix> <NIcon :component="SearchOutlined" class="mr-1" /> </template>
        </n-input>
        <n-input
          v-model:value="searchParams.email"
          clearable
          placeholder="Search by email"
          size="small"
          type="text"
        >
          <template #prefix> <NIcon :component="SearchOutlined" class="mr-1" /> </template>
        </n-input>
        <n-button secondary size="small" strong type="info" @click="fetchList"> Search </n-button>
      </div>

      <div class="table_content_container">
        <table class="table">
          <thead class="head">
            <tr>
              <th class="th">Name</th>
              <th class="th">Picture</th>
              <th class="th">Email</th>
              <th class="th">Role</th>
              <th class="th">Phone#</th>
              <th class="th">Status</th>
              <th class="th">Address</th>
              <th class="th">Created At</th>
              <th
                class="sticky_el right-0 z-20"
                v-permission="{
                  action: ['user update', 'user delete', 'user assign permission']
                }"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="list.length === 0">
              <td colspan="9" class="data_placeholder">Record Not Exist</td>
            </tr>
            <tr v-else v-for="item in list" :key="item.id" class="body_tr">
              <td class="td">
                {{ item?.profile?.first_name + ' ' + item?.profile?.last_name }}
              </td>
              <td class="td text-center pt-2">
                <n-avatar size="large" :src="`${imgUrl}${item?.profile?.profile_picture}`" />
              </td>
              <td class="td">{{ item?.email }}</td>
              <td class="td">
                <n-space>
                  <n-tag v-for="role in item.roles" :key="role.id" type="success" :bordered="false">
                    {{ role?.name }}
                  </n-tag>
                </n-space>
              </td>
              <td class="td">{{ item?.profile?.phone_number }}</td>
              <td class="td">
                <n-tag :bordered="false" :type="item.status === 'disabled' ? 'error' : 'info'">
                  {{ item.status === 1 ? 'Active' : 'Disable' }}
                </n-tag>
              </td>
              <td class="td">
                {{
                  item?.profile?.address +
                  ' ' +
                  item?.profile?.city +
                  ' ' +
                  item?.profile?.state +
                  ' ' +
                  item?.profile?.country
                }}
              </td>
              <td class="td">{{ item.created_at }}</td>
              <td
                class="sticky_el right-0 z-10"
                v-permission="{
                  action: ['user update', 'user delete', 'user assign permission']
                }"
              >
                <n-dropdown
                  @click="actionOperation(item)"
                  :onSelect="selectedAction"
                  trigger="click"
                  :options="filteredOptions"
                >
                  <n-button size="small" :circle="true">
                    <n-icon>
                      <more-outlined />
                    </n-icon>
                  </n-button>
                </n-dropdown>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </n-card>
    <n-card>
      <n-pagination
        v-model:page="page"
        v-model:page-size="perPage"
        :item-count="itemCount"
        :page-sizes="pageSizes"
        size="small"
        :show-quick-jumper="true"
        :show-size-picker="true"
      >
        <template #prefix="{ itemCount }"> Total Products: {{ itemCount }} </template>
      </n-pagination>
    </n-card>
    <n-modal style="width: 50%" v-model:show="showModal" preset="dialog">
      <template #header>
        <div>Create New User</div>
      </template>
      <n-space :vertical="true">
        <add-user
          @created="
            getList();
            showModal = false;
          "
        />
      </n-space>
    </n-modal>

    <n-modal style="width: 70%" v-model:show="showEditModal" preset="dialog">
      <template #header>
        <div>Update User</div>
      </template>
      <n-space :vertical="true">
        <edit-user
          :id="selectedId"
          @updated="
            getList();
            showEditModal = false;
          "
        />
      </n-space>
    </n-modal>
  </n-space>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { NIcon, NPagination, useDialog } from 'naive-ui';
import { MoreOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@vicons/antd';
import { deleteRecordApi } from '@src/api/endpoints';
import { useEnv } from '@src/hooks/useEnv';
import { renderIcon } from '@src/utils/renderIcon';
import { usePermission } from '@src/hooks/permission/usePermission';
import { usePagination } from '@src/hooks/pagination/usePagination';
import AddUser from '@src/components/user/AddUser.vue';
import EditUser from '@src/components/user/EditUser.vue';

const { imgUrl } = useEnv();
const router = useRouter();
const dialog = useDialog();
const selectedOption: Ref = ref(null);
const showModal = ref(false);
const showEditModal = ref(false);
const selectedId = ref();
const { hasPermission } = usePermission();

// fetch all records
const { getList, list, page, pageSizes, itemCount, perPage, searchParams }: any =
  usePagination('/user');

onMounted(() => {
  getList();
});

const moreOptions = ref([
  {
    label: 'Assign Permission',
    key: 'assign_permission',
    icon: renderIcon(EditOutlined),
    permission: hasPermission(['user assign permission'])
  },
  {
    label: 'Edit',
    key: 'edit',
    icon: renderIcon(EditOutlined),
    permission: hasPermission(['user update'])
  },
  {
    label: 'Delete',
    key: 'delete',
    icon: renderIcon(DeleteOutlined),
    permission: hasPermission(['user delete'])
  }
]);

const filteredOptions = computed(() => {
  return moreOptions.value.filter((option) => option.permission);
});

function confirmationDialog() {
  dialog.error({
    title: 'Confirmation',
    content: () => 'Are you sure you want to delete?',
    positiveText: 'Delete',
    negativeText: 'Cancel',
    onPositiveClick: deleteOperation
  });
}

function deleteOperation() {
  deleteRecordApi(`/user/${selectedId.value}`)
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
  selectedOption.value = null;
}

const actionOperation = (item: any) => {
  if (selectedOption.value === 'assign_permission') {
    router.push({
      name: 'user_assign_permission',
      params: { userId: item.id }
    });
  } else if (selectedOption.value === 'edit') {
    showEditModal.value = true;
    selectedId.value = item.id;
  } else if (selectedOption.value === 'delete') {
    selectedId.value = item.id;
    confirmationDialog();
  }
};
const selectedAction = (key: any) => {
  selectedOption.value = key;
};
const fetchList = () => {
  getList(searchParams.value);
};
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
  @apply px-3 py-3 border-r border-b border-gray-200 dark:border-gray-800 whitespace-nowrap;
}
.body_tr {
  @apply hover:bg-gray-50 dark:hover:bg-gray-600;
}
.td {
  @apply px-3 border-r border-b border-gray-200 dark:border-gray-800 whitespace-nowrap;
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
