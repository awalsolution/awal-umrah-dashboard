<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-2xl font-bold">Booking List</h1>
      <Button
        @click="router.push('/booking/add')"
        severity="primary"
        label="Add Booking"
        icon="pi pi-plus"
        v-permission="{ action: ['booking create'] }"
      />
    </div>
    <DataTable
      :value="list"
      stripedRows
      dataKey="id"
      v-model:filters="filters"
      filterDisplay="row"
      paginator
      :rows="20"
      :rowsPerPageOptions="pageSizes"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :currentPageReportTemplate="`Showing ${page} to ${perPage} of ${itemCount} Bookings`"
    >
      <template #empty> No Bookings found. </template>
      <Column field="name" header="Name" :show-filter-menu="false" :showClearButton="false">
        <template #body="{ data }">
          {{ data.name }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            placeholder="Search by Name"
            @input="filterCallback"
            class="w-full"
          />
        </template>
      </Column>
      <Column field="status" header="status">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="data.status === 0 ? 'error' : 'info'">
            {{ data.status === 1 ? 'Active' : 'Disable' }}
          </Tag>
        </template>
      </Column>
      <Column field="created_by" header="Auther">
        <template #body="{ data }">
          {{ data.created_by }}
        </template>
      </Column>
      <Column field="created_at" header="Created At">
        <template #body="{ data }">
          {{ data.created_at }}
        </template>
      </Column>
      <Column header="Actions" v-permission="{ action: ['booking update', 'booking delete'] }">
        <template #body="{ data }">
          <Button
            label="Edit"
            icon="pi pi-pen-to-square"
            outlined
            rounded
            class="mr-2"
            @click="router.push(`/booking/edit/${data.id}`)"
            v-permission="{
              action: ['booking update']
            }"
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="openDeleteDialog(data)"
            v-permission="{
              action: ['booking delete']
            }"
          />
        </template>
      </Column>
    </DataTable>

    <!-- delete form  -->
    <Dialog v-model:visible="deleteDialog" class="w-1/3" header="Confirm" :modal="true">
      <div class="flex items-center gap-4">
        <i class="pi pi-exclamation-triangle !text-3xl" />
        <span v-if="data">
          Are you sure you want to delete <b>{{ data.name }} </b>?
        </span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteDialog = false" />
        <Button label="Yes" icon="pi pi-check" severity="danger" @click="handleDelete" />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, type Ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { FilterMatchMode } from '@primevue/core/api';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { deleteRecordApi } from '@src/api/endpoints';
import { usePagination } from '@src/hooks/pagination/usePagination';
import { debounce } from 'lodash-es';

const router = useRouter();
const data: Ref = ref({});
const deleteDialog: Ref = ref(false);
const deleteId: Ref = ref();

const { getList, list, page, pageSizes, itemCount, perPage, searchParams }: any =
  usePagination('/roles');

const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const fetchList = () => {
  searchParams.value = {
    name: filters.value.name.value || ''
  };
  getList(searchParams.value);
};
// Debounce fetchList by 2 seconds
const debouncedFetchList = debounce(fetchList, 1000);

// Watch filters and call the debounced function when they change
watch(filters, debouncedFetchList, { deep: true });

onMounted(() => {
  fetchList();
});

// function openAddDialog() {
//   dialogHeader.value = 'Add Booking';
//   data.value = {};
//   submitted.value = false;
//   addDialog.value = true;
// }

// function openEditDialog(item: any) {
//   dialogHeader.value = 'Edit Booking';
//   data.value = item;
//   submitted.value = false;
//   addDialog.value = true;
// }

function openDeleteDialog(item: any) {
  deleteId.value = item.id;
  data.value = item;
  deleteDialog.value = true;
}

// function hideDialog() {
//   addDialog.value = false;
//   submitted.value = false;
// }

// const saveForm = () => {
//   submitted.value = true;
//   if (data?.value.name?.trim()) {
//     if (data?.value.id) {
//       updateRecordApi(`/roles/${data.value.id}`, data.value).then((res: any) => {
//         window.toast('success', 'Success Message', res.message);
//         getList();
//       });
//     } else {
//       createRecordApi('/roles', data.value).then((res: any) => {
//         window.toast('success', 'Success Message', res.message);
//         getList();
//       });
//     }
//     addDialog.value = false;
//     data.value = {};
//   }
// };

function handleDelete() {
  deleteRecordApi(`/bookings/${deleteId.value}`)
    .then((res: any) => {
      window.toast('success', 'Success Message', res.message);
      getList();
    })
    .catch((res) => {
      window.toast('error', 'Error Message', res.message);
    });
  deleteDialog.value = false;
  deleteId.value = null;
}
</script>

<style lang="scss" scoped></style>
