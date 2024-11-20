<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-2xl font-bold">User List</h1>
      <Button
        @click="openAddDialog"
        severity="primary"
        label="Add User"
        icon="pi pi-plus"
        v-permission="{ action: ['user create'] }"
      />
    </div>
    <DataTable
      class=""
      :value="list"
      stripedRows
      dataKey="id"
      scrollable
      v-model:filters="filters"
      filterDisplay="row"
      paginator
      :rows="20"
      :rowsPerPageOptions="pageSizes"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :currentPageReportTemplate="`Showing ${page} to ${perPage} of ${itemCount} Users`"
    >
      <template #empty> <div class="text-center">No Users found.</div> </template>
      <Column
        field="name"
        header="Name"
        class="whitespace-nowrap min-w-56"
        :show-filter-menu="false"
        :showClearButton="false"
      >
        <template #body="{ data }">
          {{ data?.name }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            placeholder="Search by Email"
            @input="filterCallback"
            class="w-full"
          />
        </template>
      </Column>
      <Column
        field="email"
        header="Email"
        class="whitespace-nowrap min-w-56"
        :show-filter-menu="false"
        :showClearButton="false"
      >
        <template #body="{ data }">
          {{ data?.email }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            placeholder="Search by Email"
            @input="filterCallback"
            class="w-full"
          />
        </template>
      </Column>
      <Column
        field="phone_number"
        header="Phone#"
        class="whitespace-nowrap min-w-56"
        :show-filter-menu="false"
        :showClearButton="false"
      >
        <template #body="{ data }">
          {{ data?.phone_number }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            placeholder="Search by Phone"
            @input="filterCallback"
            class="w-full"
          />
        </template>
      </Column>
      <Column field="profile_picture" header="Image">
        <template #body="{ data }">
          <Avatar :image="imgUrl + data?.profile_picture" shape="circle" size="small" />
        </template>
      </Column>
      <Column field="roles" header="Role" class="whitespace-nowrap">
        <template #body="{ data }">
          <Tag v-for="role in data.roles || []" :key="role.id" severity="primary">
            {{ role?.name }}
          </Tag>
        </template>
      </Column>
      <Column field="status" header="status" class="whitespace-nowrap">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="data.status === 0 ? 'error' : 'info'">
            {{ data.status === 1 ? 'Active' : 'Disable' }}
          </Tag>
        </template>
      </Column>
      <Column field="address" header="Address" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data?.address + ' ' + data?.city + ' ' + data?.state + ' ' + data?.country }}
        </template>
      </Column>
      <Column field="created_by" header="Auther" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data?.created_by }}
        </template>
      </Column>
      <Column field="created_at" header="Created At" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data?.created_at }}
        </template>
      </Column>
      <Column
        header="Actions"
        v-permission="{ action: ['user update', 'user delete', 'user assign permission'] }"
        class="whitespace-nowrap"
      >
        <template #body="{ data }">
          <Button
            label="Assign Permission"
            icon="pi pi-pen-to-square"
            outlined
            rounded
            class="mr-2"
            @click="router.push({ name: 'user_assign_permission', params: { userId: data?.id } })"
            v-permission="{ action: ['user assign permission'] }"
          />
          <Button
            label="Edit"
            icon="pi pi-pen-to-square"
            outlined
            rounded
            class="mr-2"
            @click="openEditDialog(data)"
            v-permission="{ action: ['user update'] }"
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="openDeleteDialog(data)"
            v-permission="{ action: ['user delete'] }"
          />
        </template>
      </Column>
    </DataTable>
    <!-- add and update form -->
    <Dialog
      v-model:visible="addDialog"
      class="w-1/2"
      :header="dialogHeader"
      :modal="true"
      :closable="false"
    >
      <div class="flex flex-col gap-6">
        <div class="flex gap-5">
          <div class="w-full">
            <label for="name" class="block font-bold mb-3">Name</label>
            <InputText
              id="name"
              v-model.trim="data.name"
              :required="true"
              :invalid="submitted && !data.name"
              placeholder="Name"
              fluid
            />
            <small v-if="submitted && !data.first_name" class="text-red-500">
              First Name is required.
            </small>
          </div>
          <div class="w-full">
            <label for="email" class="block font-bold mb-3">Email</label>
            <InputText
              id="email"
              v-model.trim="data.email"
              :required="true"
              :invalid="submitted && !data.email"
              placeholder="Email"
              fluid
            />
            <small v-if="submitted && !data.last_name" class="text-red-500">
              Last Name is required.
            </small>
          </div>
        </div>
        <div class="flex gap-5">
          <div class="w-full">
            <label for="password" class="block font-bold mb-3">Password</label>
            <Password
              id="password"
              v-model.trim="data.password"
              :required="true"
              :invalid="submitted && !data.password"
              placeholder="Password"
              toggleMask
              fluid
            />
            <small v-if="submitted && !data.password" class="text-red-500">
              Password is required.
            </small>
          </div>
          <div class="w-full">
            <label for="roles" class="block font-bold mb-3">Select Role</label>
            <MultiSelect
              id="roles"
              v-model="data.roles"
              :options="roles"
              filter
              display="chip"
              placeholder="Select Roles"
              optionLabel="name"
              optionValue="id"
              :loading="roleLoading"
              class="w-full"
              @focus="getRolesOnFocus"
            />
          </div>
        </div>
        <div class="flex gap-5">
          <div class="w-full">
            <label for="status" class="block font-bold mb-3">Status</label>
            <ToggleSwitch id="status" v-model="data.status" :true-value="1" :false-value="0" />
          </div>
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" @click="saveForm" />
      </template>
    </Dialog>
    <!-- delete form -->
    <Dialog v-model:visible="delDialog" class="w-1/3" header="Confirm" :modal="true">
      <div class="flex items-center gap-4">
        <i class="pi pi-exclamation-triangle !text-3xl" />
        <span v-if="data">
          Are you sure you want to delete <b>{{ data.email }} </b>?
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
import MultiSelect from 'primevue/multiselect';
import Password from 'primevue/password';
import Avatar from 'primevue/avatar';
import { createRecordApi, deleteRecordApi, updateRecordApi } from '@src/api/endpoints';
import { usePagination } from '@src/hooks/pagination/usePagination';
import { debounce } from 'lodash-es';
import { useRolefilter } from '@src/filters/role';
import { useEnv } from '@src/hooks/useEnv';

const { imgUrl } = useEnv();
const router = useRouter();
const data: Ref = ref({});
const submitted: Ref = ref(false);
const addDialog: Ref = ref(false);
const delDialog: Ref = ref(false);
const dialogHeader: Ref = ref();
const delId: Ref = ref();
const { roles, roleLoading, getRolesOnFocus, getRoles } = useRolefilter();

const { getList, list, page, pageSizes, itemCount, perPage, searchParams }: any =
  usePagination('/users');

const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  phone_number: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const fetchList = () => {
  searchParams.value = {
    name: filters.value.name.value || '',
    email: filters.value.email.value || '',
    phone: filters.value.phone_number.value || ''
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
  dialogHeader.value = 'Add User';
  data.value = {};
  submitted.value = false;
  addDialog.value = true;
}

function openEditDialog(item: any) {
  dialogHeader.value = 'Edit User';
  data.value = item;
  data.value.roles = data.value.roles.map((v: any) => v.id);
  getRoles();
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
  fetchList();
}

const saveForm = () => {
  submitted.value = true;
  if (data?.value.email?.trim() && data?.value.password?.trim()) {
    if (data?.value.id) {
      updateRecordApi(`/users/${data.value.id}`, data.value).then((res: any) => {
        window.toast('success', 'Success Message', res.message);
        getList();
      });
    } else {
      createRecordApi('/users', data.value).then((res: any) => {
        window.toast('success', 'Success Message', res.message);
        getList();
      });
    }
    addDialog.value = false;
    data.value = {};
  }
};

function handleDelete() {
  deleteRecordApi(`/users/${delId.value}`)
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
