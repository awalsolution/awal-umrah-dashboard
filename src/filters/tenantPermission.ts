import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';
import { isEmpty } from 'lodash';

export function useTenantPermissionfilter() {
  const tenantPermissions: any = ref([]);
  const tenantpermissionLoading = ref(false);
  const permissionsInitialized = ref(false);

  async function findTenantPermission(query: any, db_name: any) {
    if (isEmpty(query)) {
      tenantPermissions.value = [];
    } else {
      tenantpermissionLoading.value = true;
      const response: any = await getRecordsApi('/tenant/find-permissions-of-tenant', {
        name: query,
        db_name: db_name
      });
      tenantPermissions.value = response.data;
      tenantpermissionLoading.value = false;
    }
  }

  async function getTenantPermissions(db_name: any) {
    tenantpermissionLoading.value = true;
    const response: any = await getRecordsApi('/tenant/find-permissions-of-tenant', {
      db_name: db_name
    });
    tenantPermissions.value = response.data;
    tenantpermissionLoading.value = false;
  }

  async function getTenantPermissionsOnFocus(db_name: any) {
    if (!permissionsInitialized.value) {
      await getTenantPermissions(db_name);
      permissionsInitialized.value = true;
    }
  }

  return {
    tenantPermissions,
    tenantpermissionLoading,
    permissionsInitialized,
    findTenantPermission,
    getTenantPermissions,
    getTenantPermissionsOnFocus
  };
}
