<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-2xl font-bold">Agencies List</h1>
      <Button
        @click="openAddDialog"
        severity="primary"
        label="Add Agency"
        icon="pi pi-plus"
        v-permission="{ action: ['agencies create'] }"
      />
    </div>
    <DataTable
      :value="list"
      stripedRows
      scrollable
      dataKey="id"
      v-model:filters="filters"
      filterDisplay="row"
      paginator
      :rows="20"
      :rowsPerPageOptions="pageSizes"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :currentPageReportTemplate="`Showing ${page} to ${perPage} of ${itemCount} Agencies`"
    >
      <template #empty> No Agencies found. </template>
      <Column
        field="name"
        header="Name"
        :show-filter-menu="false"
        :showClearButton="false"
        class="whitespace-nowrap min-w-48"
      >
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
      <Column field="phone" header="Phone" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.phone }}
        </template>
      </Column>
      <Column field="address" header="Address" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.address }}
        </template>
      </Column>
      <Column field="city" header="City" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.city }}
        </template>
      </Column>
      <Column field="state" header="State" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.state }}
        </template>
      </Column>
      <Column field="country" header="Country" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.country }}
        </template>
      </Column>
      <Column field="status" header="status">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="data.status === 0 ? 'error' : 'info'">
            {{ data.status === 1 ? 'Active' : 'Disable' }}
          </Tag>
        </template>
      </Column>
      <Column field="auther" header="Auther" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.user.name }}
        </template>
      </Column>
      <Column field="created_at" header="Created At" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data.created_at }}
        </template>
      </Column>
      <Column
        header="Actions"
        v-permission="{ action: ['agencies update', 'agencies delete'] }"
        class="whitespace-nowrap"
      >
        <template #body="{ data }">
          <Button
            label="Edit"
            icon="pi pi-pen-to-square"
            outlined
            rounded
            class="mr-2"
            @click="openEditDialog(data)"
            v-permission="{
              action: ['agencies update']
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
              action: ['agencies delete']
            }"
          />
        </template>
      </Column>
    </DataTable>
    <!-- add edit form -->
    <Dialog v-model:visible="addDialog" class="w-1/2" :header="dialogHeader" :modal="true">
      <div class="grid grid-cols-3 gap-5">
        <div>
          <label for="name" class="block font-bold mb-3">Name</label>
          <InputText id="name" v-model="data.name" fluid placeholder="Enter Name" />
        </div>
        <div>
          <label for="phone" class="block font-bold mb-3">Phone Number</label>
          <InputText id="phone" v-model="data.phone" fluid placeholder="Enter Phone Number" />
        </div>
        <div>
          <label for="address" class="block font-bold mb-3">Address</label>
          <InputText id="address" v-model="data.address" fluid placeholder="Enter Address" />
        </div>
        <div>
          <label for="city" class="block font-bold mb-3">City</label>
          <InputText id="city" v-model="data.city" fluid placeholder="Enter City Name" />
        </div>
        <div>
          <label for="state" class="block font-bold mb-3">State</label>
          <InputText id="state" v-model="data.state" fluid placeholder="Enter State Name" />
        </div>
        <div>
          <label for="country" class="block font-bold mb-3">Country</label>
          <InputText id="country" v-model="data.country" fluid placeholder="Enter Country Name" />
        </div>
        <div>
          <label for="status" class="block font-bold mb-3">Status</label>
          <ToggleSwitch id="status" v-model="data.status" :true-value="1" :false-value="0" />
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" @click="saveForm" />
      </template>
    </Dialog>
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
import { FilterMatchMode } from '@primevue/core/api';
import ToggleSwitch from 'primevue/toggleswitch';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { createRecordApi, deleteRecordApi, updateRecordApi } from '@src/api/endpoints';
import { usePagination } from '@src/hooks/pagination/usePagination';
import { debounce } from 'lodash-es';

const data: Ref = ref({});
const addDialog: Ref = ref(false);
const deleteDialog: Ref = ref(false);
const dialogHeader: Ref = ref();
const deleteId: Ref = ref();

const { getList, list, page, pageSizes, itemCount, perPage, searchParams }: any =
  usePagination('/agencies');

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

function openAddDialog() {
  dialogHeader.value = 'Add Agency';
  data.value = {};

  addDialog.value = true;
}

function openEditDialog(item: any) {
  dialogHeader.value = 'Edit Agency';
  data.value = item;

  addDialog.value = true;
}

function openDeleteDialog(item: any) {
  deleteId.value = item.id;
  data.value = item;
  deleteDialog.value = true;
}

function hideDialog() {
  addDialog.value = false;
}

const saveForm = () => {
  if (data?.value.id) {
    updateRecordApi(`/agencies/${data.value.id}`, data.value).then((res: any) => {
      window.toast('success', 'Success Message', res.message);
      getList();
    });
  } else {
    createRecordApi('/agencies', data.value).then((res: any) => {
      window.toast('success', 'Success Message', res.message);
      getList();
    });
  }
  addDialog.value = false;
  data.value = {};
};

function handleDelete() {
  deleteRecordApi(`/agencies/${deleteId.value}`)
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
