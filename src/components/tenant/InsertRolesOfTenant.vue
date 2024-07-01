<template>
  <div class="mb-5">
    <n-space :vertical="true">
      <n-card title="Insert Role into Organization Database">
        <template #header-extra>
          <NButton secondary type="info" size="medium" @click="handleInsertRoles"> Save </NButton>
        </template>
        <n-checkbox-group v-model:value="selectedRoles">
          <n-row>
            <n-col v-for="role of roles" :key="role.id" :span="6">
              <n-checkbox :value="role.name" :label="role.name" />
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
import { createRecordApi } from '@src/api/endpoints';
import { useRolefilter } from '@src/filters/role';

const { roles, getRoles } = useRolefilter();
const route = useRoute();
const router = useRouter();
const selectedRoles: Ref = ref([]);

onMounted(() => {
  getRoles();
});

const handleInsertRoles = () => {
  createRecordApi(`/tenant/insert-role-of-tenant`, {
    db_name: route.params.db_name,
    roles: selectedRoles.value
  }).then((res: any) => {
    window['$message'].success(res.message);
    router.push({
      name: 'organization_details'
    });
  });
};
</script>

<style lang="scss" scoped></style>
