<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-2xl font-bold">Role List</h1>
      <Button
        @click="openAddDialog"
        severity="primary"
        label="Add Role"
        icon="pi pi-plus"
        v-permission="{ action: ['role create'] }"
      />
    </div>
    <DataTable
      v-model:expandedRows="expandedRows"
      :value="list"
      stripedRows
      dataKey="id"
      v-model:filters="filters"
      filterDisplay="row"
      paginator
      :rows="20"
      :rowsPerPageOptions="pageSizes"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :currentPageReportTemplate="`Showing ${page} to ${perPage} of ${itemCount} Roles`"
    >
      <template #empty> No Roles found. </template>
      <Column expander style="width: 5rem" />
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
      <Column
        header="Actions"
        v-permission="{ action: ['role update', 'role delete', 'role assign permission'] }"
      >
        <template #body="{ data }">
          <Button
            label="Assign Permission"
            icon="pi pi-pen-to-square"
            outlined
            rounded
            class="mr-2"
            @click="router.push({ name: 'role_assign_permission', params: { roleId: data?.id } })"
            v-permission="{ action: ['role assign permission'] }"
          />
          <Button
            label="Edit"
            icon="pi pi-pen-to-square"
            outlined
            rounded
            class="mr-2"
            @click="openEditDialog(data)"
            v-permission="{
              action: ['role update']
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
              action: ['role delete']
            }"
          />
        </template>
      </Column>
      <template #expansion="slotProps">
        <DataTable :value="slotProps.data.permissions">
          <Column field="name" header="Name">
            <template #body="{ data }">
              {{ data.name }}
            </template>
          </Column>
          <Column field="type" header="Permission Type">
            <template #body="{ data }">
              <Tag :value="data.type" :severity="data.type === 'private' ? 'danger' : 'info'" />
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
        </DataTable>
      </template>
    </DataTable>
    <!-- add edit form -->
    <Dialog v-model:visible="addDialog" class="w-1/3" :header="dialogHeader" :modal="true">
      <div class="flex flex-col gap-6">
        <div>
          <label for="name" class="block font-bold mb-3">Name</label>
          <InputText
            id="name"
            v-model.trim="data.name"
            :required="true"
            :invalid="submitted && !data.name"
            fluid
          />
          <small v-if="submitted && !data.name" class="text-red-500">Name is required.</small>
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
    <Dialog v-model:visible="delDialog" class="w-1/3" header="Confirm" :modal="true">
      <div class="flex items-center gap-4">
        <i class="pi pi-exclamation-triangle !text-3xl" />
        <span v-if="data">
          Are you sure you want to delete <b>{{ data.name }} </b>?
        </span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="delDialog = false" />
        <Button label="Yes" icon="pi pi-check" severity="danger" @click="handleDelete" />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, type Ref, watch } from 'vue';
import { useRouter } from 'vue-router';
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

const router = useRouter();
const data: Ref = ref({});
const expandedRows: Ref = ref({});
const submitted: Ref = ref({});
const addDialog: Ref = ref(false);
const delDialog: Ref = ref(false);
const dialogHeader: Ref = ref();
const delId: Ref = ref();

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

function openAddDialog() {
  dialogHeader.value = 'Add Role';
  data.value = {};
  submitted.value = false;
  addDialog.value = true;
}

function openEditDialog(item: any) {
  dialogHeader.value = 'Edit Role';
  data.value = item;
  submitted.value = false;
  addDialog.value = true;
}

function openDeleteDialog(item: any) {
  delId.value = item.id;
  data.value = item;
  delDialog.value = true;
}

function hideDialog() {
  addDialog.value = false;
  submitted.value = false;
}

const saveForm = () => {
  submitted.value = true;
  if (data?.value.name?.trim()) {
    if (data?.value.id) {
      updateRecordApi(`/roles/${data.value.id}`, data.value).then((res: any) => {
        window.toast('success', 'Success Message', res.message);
        getList();
      });
    } else {
      createRecordApi('/roles', data.value).then((res: any) => {
        window.toast('success', 'Success Message', res.message);
        getList();
      });
    }
    addDialog.value = false;
    data.value = {};
  }
};

function handleDelete() {
  deleteRecordApi(`/roles/${delId.value}`)
    .then((res: any) => {
      window.toast('success', 'Success Message', res.message);
      getList();
    })
    .catch((res) => {
      window.toast('error', 'Error Message', res.message);
    });
  delDialog.value = false;
  delId.value = null;
}
</script>

<style lang="scss" scoped></style>
