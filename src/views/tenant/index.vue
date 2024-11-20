<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-2xl font-bold">Organization List</h1>
      <Button
        @click="router.push({ name: 'organization_add' })"
        severity="primary"
        label="Add Organization"
        icon="pi pi-plus"
        v-permission="{ action: ['tenant create'] }"
      />
    </div>
    <DataTable
      :value="list"
      stripedRows
      dataKey="id"
      scrollable
      paginator
      :rows="20"
      :rowsPerPageOptions="pageSizes"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :currentPageReportTemplate="`Showing ${page} to ${perPage} of ${itemCount} Organizations`"
    >
      <template #empty> <div class="text-center">No Organizations found.</div> </template>
      <Column field="logo" header="Logo" class="">
        <template #body="{ data }">
          <Avatar :image="imgUrl + data?.logo" shape="circle" size="large" />
        </template>
      </Column>
      <Column field="tenant_name" header="Name" class="whitespace-nowrap">
        <template #body="{ data }">
          <RouterLink
            :to="{ name: 'organization_edit', params: { tenant_id: data?.id } }"
            class="text-primary"
          >
            {{ data?.tenant_name }}
          </RouterLink>
        </template>
      </Column>
      <Column field="domain_name" header="Domain" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data?.domain_name }}
        </template>
      </Column>
      <Column field="phone_number" header="Phone#" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data?.phone_number }}
        </template>
      </Column>
      <Column field="status" header="status" class="whitespace-nowrap">
        <template #body="{ data }">
          <Tag :severity="data.status === 0 ? 'danger' : 'info'">
            {{ data.status === 1 ? 'Active' : 'Disable' }}
          </Tag>
        </template>
      </Column>
      <Column field="plan" header="Plan" class="whitespace-nowrap">
        <template #body="{ data }">
          <Tag severity="primary">
            {{ data.plan?.name }}
          </Tag>
        </template>
      </Column>
      <Column field="db_name" header="Database" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data?.db_name }}
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
        v-permission="{ action: ['tenant update', 'tenant delete'] }"
        class="whitespace-nowrap"
      >
        <template #body="{ data }">
          <Button
            label="Edit Plan"
            icon="pi pi-pen-to-square"
            outlined
            rounded
            severity="danger"
            class="mr-2"
            @click="editPlanDialog($event, data)"
            v-permission="{ action: ['tenant update'] }"
          />
          <Button
            v-if="data.status === 0"
            label="Active"
            icon="pi pi-pen-to-square"
            outlined
            rounded
            severity="primary"
            class="mr-2"
            @click="openActivationDialog(data)"
            v-permission="{ action: ['tenant update'] }"
          />
          <Button
            v-else
            label="Deactive"
            icon="pi pi-pen-to-square"
            outlined
            rounded
            severity="danger"
            class="mr-2"
            @click="deactivationDialog($event, data)"
            v-permission="{ action: ['tenant update'] }"
          />
          <Button
            label="Edit"
            icon="pi pi-pen-to-square"
            outlined
            rounded
            class="mr-2"
            @click="router.push({ name: 'organization_edit', params: { tenant_id: data?.id } })"
            v-permission="{ action: ['tenant update'] }"
          />
          <Button
            disabled
            label="Delete"
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="openDeleteDialog(data)"
            v-permission="{ action: ['tenant delete'] }"
          />
        </template>
      </Column>
    </DataTable>

    <!-- delete form -->
    <Dialog v-model:visible="showDeleteDialog" class="w-1/3" header="Confirm" :modal="true">
      <div class="flex items-center gap-4">
        <i class="pi pi-exclamation-triangle !text-3xl" />
        <span> Are you sure you want to delete ? </span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="showDeleteDialog = false" />
        <Button label="Yes" icon="pi pi-check" severity="danger" @click="handleDelete" />
      </template>
    </Dialog>

    <!-- Activation Dialog -->
    <Dialog
      v-model:visible="showActivationDialog"
      class="w-1/3"
      header="Organization Activation "
      :modal="true"
      :closable="false"
    >
      <div class="flex gap-5">
        <div class="w-full">
          <label for="roles" class="block font-bold mb-3">Select Role</label>
          <Select
            id="roles"
            v-model="data.role_id"
            :options="roles"
            placeholder="Select Roles"
            optionLabel="name"
            optionValue="id"
            class="w-full"
            @focus="getRolesOnFocus"
          />
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideActivationDialog" />
        <Button label="Save" icon="pi pi-check" @click="saveActivationForm" />
      </template>
    </Dialog>
    <!-- Deactivation Dialog -->
    <ConfirmPopup />
    <!-- Edit plan Dialog -->
    <ConfirmDialog group="headless" class="w-1/6">
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
          <div class="edit_plan_box_inner">
            <i class="pi pi-question text-5xl"></i>
          </div>
          <span class="font-bold text-2xl block mb-2 mt-6">{{ message.header }}</span>
          <p class="mb-0">{{ message.message }}</p>
          <div class="w-full">
            <label for="plan_id" class="block font-semibold mb-1">Plan</label>
            <Select
              id="plan_id"
              v-model="editPlanData.id"
              :options="plans"
              option-label="name"
              option-value="id"
              placeholder="Select Plan"
              class="w-full"
            />
          </div>
          <div class="flex items-center gap-2 mt-6">
            <Button label="Save" @click="acceptCallback"></Button>
            <Button label="Cancel" outlined @click="rejectCallback"></Button>
          </div>
        </div>
      </template>
    </ConfirmDialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { usePagination } from '@src/hooks/pagination/usePagination';
import { createRecordApi, deleteRecordApi, updateRecordApi } from '@src/api/endpoints';
import { useRolefilter } from '@src/filters/role';
import { usePlanfilter } from '@src/filters/plan';
import { useEnv } from '@src/hooks/useEnv';
import Select from 'primevue/select';
import { useConfirm } from 'primevue/useconfirm';
import ConfirmDialog from 'primevue/confirmdialog';
import DataTable from 'primevue/datatable';
import ConfirmPopup from 'primevue/confirmpopup';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';

const { imgUrl } = useEnv();
const confirm = useConfirm();
const router = useRouter();
const deleteId: Ref = ref();
const showDeleteDialog: Ref = ref(false);
const showActivationDialog: Ref = ref(false);
const data: Ref = ref({ status: 0 });
const tenantActivationId: Ref = ref();
const editPlanData = ref();
const tenantEditPlanId: Ref = ref({});
const { roles, getRolesOnFocus } = useRolefilter();
const { plans, getPlans } = usePlanfilter();

// fetch all records
const { getList, list, page, pageSizes, itemCount, perPage }: any = usePagination('/tenants');

onMounted(() => {
  getList();
  getPlans();
});

// tenant delete
function openDeleteDialog(item: any) {
  deleteId.value = item.id;
  showDeleteDialog.value = true;
}
function handleDelete() {
  deleteRecordApi(`/tenants/${deleteId.value}`)
    .then((res: any) => {
      window.toast('success', 'Success Message', res.message);
      getList();
    })
    .catch((res) => {
      window.toast('error', 'Error Message', res.message);
    });
  showDeleteDialog.value = false;
  deleteId.value = null;
}

// tenant activation
function hideActivationDialog() {
  showActivationDialog.value = false;
}
function openActivationDialog(item: any) {
  tenantActivationId.value = item.id;
  showActivationDialog.value = true;
}
const saveActivationForm = () => {
  data.value.status = 1;
  createRecordApi(`/tenants/tenant-activation/${tenantActivationId.value}`, data.value).then(
    (res: any) => {
      window.toast('success', 'Success Message', res.message);
      getList();
    }
  );
  showActivationDialog.value = false;
  data.value = {};
};

// tenant deactivation
const deactivationDialog = (event: any, item: any) => {
  tenantActivationId.value = item.id;
  confirm.require({
    target: event.currentTarget,
    message: 'Are you sure you want to proceed?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Save'
    },
    accept: async () => {
      await saveDeactivationForm();
    }
  });
};
const saveDeactivationForm = async () => {
  data.value.status = 0;
  createRecordApi(`/tenants/tenant-activation/${tenantActivationId.value}`, data.value).then(
    (res: any) => {
      window.toast('success', 'Success Message', res.message);
      getList();
    }
  );
  data.value = {};
};

// tenant edit plan
const editPlanDialog = (event: any, item: any) => {
  editPlanData.value = item.plan;
  tenantEditPlanId.value = item.id;
  confirm.require({
    group: 'headless',
    header: 'Are you sure?',
    message: 'Please confirm to proceed.',
    accept: async () => {
      await editPlan();
    }
  });
};
const editPlan = async () => {
  updateRecordApi(
    `/tenants/edit-single-tenant-plan/${tenantEditPlanId.value}`,
    editPlanData.value
  ).then((res: any) => {
    window.toast('success', 'Success Message', res.message);
    getList();
  });
};
</script>

<style lang="scss" scoped>
.edit_plan_box_inner {
  @apply rounded-full bg-primary text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20;
}
</style>
