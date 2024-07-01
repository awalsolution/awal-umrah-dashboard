<template>
  <div class="mb-5">
    <n-space :vertical="true">
      <n-card title="Assign permission to organization role">
        <template #header-extra>
          <NButton secondary type="info" size="medium" @click="handleAssignPermissions">
            Assign Permission
          </NButton>
        </template>
        <n-checkbox-group class="mx-2" v-model:value="selectedPermissions">
          <n-row>
            <n-col v-for="permission of permissions" :key="permission.id" :span="7">
              <n-checkbox :value="permission.id" :label="permission.name" class="pb-1" />
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
import { onMounted, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getRecordsApi, updateRecordApi } from '@src/api/endpoints';

const route = useRoute();
const router = useRouter();
const permissions: Ref = ref([]);
const selectedPermissions: Ref = ref([]);

onMounted(() => {
  if (route.params && (route.params.role_id || route.params.db_name)) {
    getRecordsApi(`/tenant/all-permission/${route.params.db_name}`, {
      role_id: route.params.role_id
    }).then((res: any) => {
      permissions.value = res.data?.permissions;
      selectedPermissions.value = res.data?.role?.permissions.map((item: any) => {
        return item.id;
      });
    });
  } else {
    router.replace({ name: 'ErrorPageSon' });
  }
});

const handleAssignPermissions = () => {
  updateRecordApi(`/tenant/assign-permission/${route.params.role_id}`, {
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
