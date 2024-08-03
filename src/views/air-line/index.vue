<template>
  <n-space :vertical="true">
    <n-card title="Air Line List">
      <template #header-extra>
        <NButton
          secondary
          type="info"
          size="small"
          @click="showModal = true"
          v-permission="{ action: ['air line create'] }"
        >
          Add Air Line
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
          v-model:value="searchParams.name"
          clearable
          placeholder="Search by name"
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
              <th class="th">Logo</th>
              <th class="th">Status</th>
              <th class="th">Phone#</th>
              <th class="th">Address</th>
              <th class="th">Auther</th>
              <th class="th">Created At</th>
              <th
                class="sticky_el right-0 z-20"
                v-permission="{
                  action: ['air line update', 'air line delete']
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
              <td class="td">{{ item?.name }}</td>
              <td class="td text-center pt-2">
                <n-avatar size="large" :src="`${imgUrl}${item?.logo}`" />
              </td>
              <td class="td">
                <n-tag :bordered="false" :type="item.status === 'disabled' ? 'error' : 'info'">
                  {{ item.status === 1 ? 'Active' : 'Disable' }}
                </n-tag>
              </td>
              <td class="td">{{ item?.phone_number }}</td>
              <td class="td">{{ item?.address }}</td>
              <td class="td">{{ item?.created_by }}</td>
              <td class="td">{{ item.created_at }}</td>
              <td
                class="sticky_el right-0 z-10"
                v-permission="{
                  action: ['air line update', 'air line delete']
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
        v-model:page-size="pageSize"
        :item-count="itemCount"
        :page-sizes="pageSizes"
        size="small"
        :show-quick-jumper="true"
        :show-size-picker="true"
      >
        <template #prefix="{ itemCount }"> Total Air Lines: {{ itemCount }} </template>
      </n-pagination>
    </n-card>
    <n-modal style="width: 50%" v-model:show="showModal" preset="dialog">
      <template #header>
        <div>Create New Air Line</div>
      </template>
      <n-space :vertical="true">
        <add-air-line
          @created="
            getList();
            showModal = false;
          "
        />
      </n-space>
    </n-modal>

    <n-modal style="width: 50%" v-model:show="showEditModal" preset="dialog">
      <template #header>
        <div>Update Air Line</div>
      </template>
      <n-space :vertical="true">
        <edit-air-line
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
import { NIcon, NPagination, useDialog } from 'naive-ui';
import { MoreOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@vicons/antd';
import { deleteRecordApi } from '@src/api/endpoints';
import { useEnv } from '@src/hooks/useEnv';
import { renderIcon } from '@src/utils/renderIcon';
import { usePermission } from '@src/hooks/permission/usePermission';
import { usePagination } from '@src/hooks/pagination/usePagination';
import AddAirLine from '@src/components/air-line/AddAirLine.vue';
import EditAirLine from '@src/components/air-line/EditAirLine.vue';

const { imgUrl } = useEnv();
const dialog = useDialog();
const selectedOption: Ref = ref(null);
const showModal = ref(false);
const showEditModal = ref(false);
const selectedId = ref();
const { hasPermission } = usePermission();

// fetch all records
const { getList, list, page, pageSizes, itemCount, pageSize, searchParams }: any =
  usePagination('/air-line');

onMounted(() => {
  getList();
});

const moreOptions = ref([
  {
    label: 'Edit',
    key: 'edit',
    icon: renderIcon(EditOutlined),
    permission: hasPermission(['air line update'])
  },
  {
    label: 'Delete',
    key: 'delete',
    icon: renderIcon(DeleteOutlined),
    permission: hasPermission(['air line delete'])
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
  deleteRecordApi(`/air-line/${selectedId.value}`)
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
  if (selectedOption.value === 'edit') {
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
