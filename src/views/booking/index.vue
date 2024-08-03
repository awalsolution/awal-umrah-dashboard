<template>
  <n-space :vertical="true">
    <n-card title="Booking List">
      <template #header-extra>
        <button
          class="edit_btn"
          type="button"
          @click="showModal = true"
          v-permission="{ action: ['booking create'] }"
        >
          Add Booking
        </button>
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
        <n-button secondary size="small" strong type="info" @click="fetchList">Search</n-button>
      </div>
      <div class="table_content_container">
        <table class="table">
          <thead class="head">
            <tr>
              <th class="th">Booking No</th>
              <th class="th">Customer Name</th>
              <th class="th">Status</th>
              <th class="th">Arrival Date</th>
              <th class="th">Expected Departure</th>
              <th class="th">Group</th>
              <th class="th">Group No</th>
              <th class="th">Created At</th>
              <th
                class="sticky_el right-0 z-20"
                v-permission="{
                  action: ['booking update', 'booking delete']
                }"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="list.length === 0">
              <td colspan="10" class="data_placeholder">Record Not Exist</td>
            </tr>
            <tr v-else v-for="item in list" :key="item.id" class="body_tr">
              <td class="td">{{ item?.booking_no }}</td>
              <td class="td">{{ item.customer_name }}</td>
              <td class="td">{{ item.status }}</td>
              <td class="td">{{ item.arrival_date }}</td>
              <td class="td">{{ item.expected_departure }}</td>
              <td class="td">{{ item.group_name }}</td>
              <td class="td">{{ item.group_no }}</td>
              <td class="td">{{ item.created_at }}</td>
              <td
                class="td flex gap-3 justify-center"
                v-permission="{
                  action: ['booking update', 'booking delete']
                }"
              >
                <button
                  type="button"
                  class="edit_btn"
                  @click="
                    router.push({
                      name: 'booking_print',
                      params: { id: item.id }
                    })
                  "
                >
                  Print
                </button>
                <button
                  type="button"
                  class="edit_btn"
                  @click="
                    router.push({
                      name: 'booking_edit',
                      params: { id: item.id }
                    })
                  "
                >
                  Edit
                </button>
                <button type="button" class="delete_btn" @click="deleteConfirmationDialog(item)">
                  Delete
                </button>
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
        <template #prefix="{ itemCount }"> Total Plans: {{ itemCount }} </template>
      </n-pagination>
    </n-card>
    <n-modal style="width: 80%" v-model:show="showModal" preset="dialog">
      <template #header>
        <div>Create New Booking</div>
      </template>
      <n-space :vertical="true">
        <add-booking
          @created="
            getList();
            showModal = false;
          "
        />
      </n-space>
    </n-modal>
  </n-space>
</template>

<script lang="ts" setup>
import { ref, onMounted, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { NIcon, NPagination, useDialog } from 'naive-ui';
import { SearchOutlined } from '@vicons/antd';
import { deleteRecordApi } from '@src/api/endpoints';
import { usePagination } from '@src/hooks/pagination/usePagination';
import AddBooking from '@src/components/booking/AddBooking.vue';

const router = useRouter();
const dialog = useDialog();
const selectedOption: Ref = ref(null);
const showModal: Ref = ref(false);
const selectedId: Ref = ref();

// fetch all records
const { getList, list, page, pageSizes, itemCount, perPage, searchParams }: any =
  usePagination('/booking');

onMounted(() => {
  getList();
});

function deleteConfirmationDialog(item: { id: number }) {
  selectedId.value = item.id;
  dialog.error({
    title: 'Confirmation',
    content: () => 'Are you sure you want to delete?',
    positiveText: 'Delete',
    negativeText: 'Cancel',
    onPositiveClick: deleteOperation
  });
}

function deleteOperation() {
  deleteRecordApi(`/booking/${selectedId.value}`)
    .then((res: any) => {
      window['$message'].warning(res.message);
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
.edit_btn {
  @apply text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded text-sm px-5 py-2 text-center;
}
.delete_btn {
  @apply text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l font-medium rounded text-sm px-5 py-2 text-center;
}
.data_placeholder {
  text-align: center;
  color: gray;
  padding: 20px 0;
  font-size: 18px;
  font-style: italic;
}
</style>
