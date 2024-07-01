<template>
  <div class="mb-5">
    <n-space :vertical="true">
      <n-card title="Insert Permissions into Organization Database">
        <template #header-extra>
          <NButton secondary type="info" size="medium" @click="handleInsertRoles"> Save </NButton>
        </template>
        <n-checkbox-group class="mx-2" v-model:value="selectedPermissions">
          <n-row>
            <n-col v-for="permission of permissions" :key="permission.id" :span="6">
              <n-checkbox :value="permission.name" :label="permission.name" class="mb-2" />
              <n-tag size="small" :type="permission.type === 'private' ? 'error' : 'success'">
                {{ permission.type }}
              </n-tag>
            </n-col>
          </n-row>
        </n-checkbox-group>
      </n-card>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { createRecordApi, getRecordsApi } from '@src/api/endpoints';
import { usePermissionfilter } from '@src/filters/permission';

const { permissions, getPermissions } = usePermissionfilter();
const route = useRoute();
const router = useRouter();
const selectedPermissions: Ref = ref([]);

onBeforeMount(() => {
  getPermissions();
});

onMounted(() => {
  if (route.params && route.params.db_name) {
    getRecordsApi(`/tenant/find-permissions-of-tenant`, {
      db_name: route.params.db_name
    }).then((res: any) => {
      selectedPermissions.value = res.data?.map((item: any) => {
        return item.name;
      });
    });
  } else {
    router.replace({ name: 'ErrorPageSon' });
  }
});

const handleInsertRoles = () => {
  createRecordApi(`/tenant/insert-permissions-of-tenant`, {
    db_name: route.params.db_name,
    permissions: selectedPermissions.value
  }).then((res: any) => {
    window['$message'].success(res.message);
    router.push({
      name: 'organization_details'
    });
  });
};
</script>

<style lang="scss" scoped></style>
