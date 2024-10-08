<template>
  <Card>
    <template #title>
      <div class="flex justify-between items-center">
        <h1 class="text-2xl">Permissions List</h1>
        <Button
          label="Assign Permission"
          @click="handleAssignPermissions"
          severity="primary"
          icon="pi pi-lock"
        />
      </div>
    </template>
    <template #content>
      <div v-for="(group, category) in groupedPermissions" :key="category" class="mb-5">
        <h2 class="text-xl font-semibold mb-3 capitalize">{{ category }}</h2>
        <div class="grid grid-cols-3">
          <div
            v-for="permission of group"
            :key="permission.id"
            class="flex items-center gap-3 mb-3"
          >
            <Checkbox
              v-model="selectedPermissions"
              :inputId="permission.name"
              name="permission"
              :value="permission.id"
            />
            <label :for="permission.name">{{ permission.name }}</label>
            <Tag :severity="permission.type === 'private' ? 'danger' : 'primary'">
              {{ permission.type }}
            </Tag>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePermissionfilter } from '@src/filters/permission';
import { getRecordApi, updateRecordApi } from '@src/api/endpoints';
import Tag from 'primevue/tag';
import Card from 'primevue/card';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';

const { permissions, getPermissions } = usePermissionfilter();
const groupedPermissions: Ref = ref({});
const route = useRoute();
const router = useRouter();
const userData: Ref = ref({});
const selectedPermissions: Ref = ref([]);
const fetchEndpoint: Ref = ref();
const updateEndpoint: Ref = ref();

onMounted(() => {
  if (route.params && (route.params.roleId || route.params.userId || route.params.planId)) {
    getPermissions().then(() => {
      categorizePermissions();
    });
    if (route.params.roleId) {
      fetchEndpoint.value = `/roles/${route.params.roleId}`;
      updateEndpoint.value = '/roles/assign-permission/' + route.params.roleId;
    } else if (route.params.userId) {
      fetchEndpoint.value = `/users/${route.params.userId}`;
      updateEndpoint.value = '/users/assign-permission/' + route.params.userId;
    } else if (route.params.planId) {
      fetchEndpoint.value = `/plans/${route.params.planId}`;
      updateEndpoint.value = '/plans/assign-permission/' + route.params.planId;
    }
    getRecordApi(fetchEndpoint.value).then((res: any) => {
      userData.value = res.data;
      selectedPermissions.value = res.data.permissions.map((item: any) => {
        return item.id;
      });
      window.toast('success', 'Success Message', res.message);
    });
  } else {
    router.replace({ name: 'ErrorPageSon' });
  }
});

const handleAssignPermissions = () => {
  updateRecordApi(updateEndpoint.value, {
    permissions: selectedPermissions.value
  }).then((res: any) => {
    if (route.params.roleId) {
      router.replace({ name: 'role_list' });
    } else if (route.params.planId) {
      router.replace({ name: 'plan_list' });
    } else {
      router.replace({ name: 'user_list' });
    }
    window.toast('success', 'Success Message', res.message);
  });
};

// modify data with labels
const categorizePermissions = () => {
  const categories: any = {
    dashboard: [],
    role: [],
    user: [],
    permission: [],
    tenant: [],
    plan: []
  };

  permissions.value.forEach((permission: { name: string }) => {
    if (permission.name.includes('tenant')) {
      categories.tenant.push(permission);
    } else if (permission.name.includes('permission')) {
      categories.permission.push(permission);
    } else if (permission.name.includes('plan')) {
      categories.plan.push(permission);
    } else if (permission.name.includes('user')) {
      categories.user.push(permission);
    } else if (permission.name.includes('role')) {
      categories.role.push(permission);
    } else {
      categories.dashboard.push(permission);
    }
  });
  groupedPermissions.value = categories;
};
</script>

<style lang="scss" scoped></style>
