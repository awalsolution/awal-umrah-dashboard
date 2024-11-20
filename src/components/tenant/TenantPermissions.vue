<template>
  <div>
    <DataTable class="" :value="list" stripedRows dataKey="id" scrollable>
      <template #empty> <div class="text-center">No Permissions found.</div> </template>
      <Column field="name" header="Name" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data?.name }}
        </template>
      </Column>

      <Column field="type" header="Type" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data?.type }}
        </template>
      </Column>
      <Column field="status" header="status" class="whitespace-nowrap">
        <template #body="{ data }">
          <Tag :severity="data.status === 0 ? 'error' : 'info'">
            {{ data.status === 1 ? 'Active' : 'Disable' }}
          </Tag>
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
            label="Delete"
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="deletePermissionDialog($event, data)"
            v-permission="{ action: ['tenant delete'] }"
          />
        </template>
      </Column>
    </DataTable>
    <!-- Delete permission Dialog -->
    <ConfirmDialog group="headless" class="w-1/3">
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
          <div class="edit_plan_box_inner">
            <i class="pi pi-question text-5xl"></i>
          </div>
          <span class="font-bold text-2xl block mb-2 mt-6">{{ message.header }}</span>
          <p class="mb-0">{{ message.message }}</p>
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
import { ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from 'primevue/useconfirm';
import { deleteRecordApi } from '@src/api/endpoints';

defineProps<{ list: any }>();

const route = useRoute();
const confirm = useConfirm();
const tenantPermissionId: Ref = ref({});

const emits = defineEmits(['deleted']);

// tenant edit plan
const deletePermissionDialog = (event: any, item: any) => {
  tenantPermissionId.value = item.id;
  confirm.require({
    group: 'headless',
    header: 'Are you sure? to delete the selected permission',
    message: 'Please confirm to proceed.',
    accept: async () => {
      await deletePermission();
    }
  });
};
const deletePermission = async () => {
  deleteRecordApi(`/tenants/delete-permission-of-tenant/${tenantPermissionId.value}`, {
    tenant_id: route.params.tenant_id
  }).then((res: any) => {
    window.toast('success', 'Success Message', res.message);
    emits('deleted', res.data);
  });
};
</script>

<style lang="scss" scoped>
.edit_plan_box_inner {
  @apply rounded-full bg-primary text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20;
}
</style>
