<template>
  <div>
    <DataTable class="" :value="list" stripedRows dataKey="id" scrollable paginator :rows="20">
      <!-- :rowsPerPageOptions="pageSizes"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks  NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :currentPageReportTemplate="`Showing ${page} to ${perPage} of ${itemCount} Organizations`" -->
      <template #empty> <div class="text-center">No Roles found.</div> </template>
      <Column field="name" header="Name" class="whitespace-nowrap">
        <template #body="{ data }">
          {{ data?.name }}
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
      <!-- <Column
        header="Actions"
        v-permission="{ action: ['tenant update', 'tenant delete'] }"
        class="whitespace-nowrap"
      >
        <template #body="{ data }">
          <Button
            v-tooltip.top="'Edit Tenant'"
            icon="pi pi-pencil"
            outlined
            rounded
            class="mr-2"
            @click="
              router.push({ name: 'organization_details', params: { db_name: data?.db_name } })
            "
            v-permission="{ action: ['tenant update'] }"
          />
          <Button
            disabled
            v-tooltip.top="'Delete Tenant'"
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="openDeleteDialog(data)"
            v-permission="{ action: ['tenant delete'] }"
          />
        </template>
      </Column> -->
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import { useEnv } from '@src/hooks/useEnv';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';

defineProps<{ list: any }>();
</script>
