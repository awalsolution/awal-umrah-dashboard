<template>
  <Card>
    <template #title>
      <h1 class="text-2xl">Edit Organization</h1>
    </template>
    <template #content>
      <Tabs :value="0">
        <TabList>
          <Tab :value="0">General Info</Tab>
          <Tab :value="1">Permissions</Tab>
          <Tab :value="2">Roles</Tab>
          <Tab :value="3">Users</Tab>
        </TabList>
        <TabPanels>
          <TabPanel :value="0">
            <TenantGeneralInfo
              v-if="Object.keys(generalInfo).length > 0"
              :tenantData="generalInfo"
            />
          </TabPanel>
          <TabPanel :value="1">
            <TenantPermissions
              v-if="permissionsList.length > 0"
              :list="permissionsList"
              @deleted="findTenantDetail()"
            />
          </TabPanel>
          <TabPanel :value="2">
            <TenantRoles v-if="rolesList.length > 0" :list="rolesList" />
          </TabPanel>
          <TabPanel :value="3">
            <TenantUser v-if="usersList.length > 0" :list="usersList" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getRecordApi } from '@src/api/endpoints';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Card from 'primevue/card';
import TenantGeneralInfo from '@src/components/tenant/TenantGeneralInfo.vue';
import TenantUser from '@src/components/tenant/TenantUser.vue';
import TenantRoles from '@src/components/tenant/TenantRoles.vue';
import TenantPermissions from '@src/components/tenant/TenantPermissions.vue';

const route = useRoute();
const router = useRouter();
const generalInfo: Ref = ref({});
const usersList: Ref = ref([]);
const rolesList: Ref = ref([]);
const permissionsList: Ref = ref([]);

const findTenantDetail = async () => {
  const res: any = await getRecordApi(`/tenants/find-single-tenant/${route.params.tenant_id}`);
  generalInfo.value = res?.data;
  if (generalInfo.value.activated === 1) {
    const tenantDetail: any = await getRecordApi(`/tenants/find-single-tenant-details`, {
      db_name: generalInfo.value.db_name
    });
    permissionsList.value = tenantDetail.data.permissions;
    rolesList.value = tenantDetail.data.roles;
    usersList.value = tenantDetail.data.users;
  }
};

onMounted(async () => {
  if (route.params && route.params.tenant_id) {
    findTenantDetail();
  } else {
    window.toast('error', 'Error Message', 'Route Params is Wrong!');
    router.replace({ name: 'ErrorPageSon' });
  }
});
</script>

<style lang="scss" scoped></style>
