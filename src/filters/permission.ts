import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';
import { isEmpty } from 'lodash';

export function usePermissionfilter() {
  const permissions: any = ref([]);
  const permissionLoading = ref(false);
  const permissionsInitialized = ref(false);

  async function findPermission(query: any) {
    if (isEmpty(query)) {
      permissions.value = [];
    } else {
      permissionLoading.value = true;
      const response: any = await getRecordsApi('/permissions', {
        name: query
      });
      permissions.value = response.data;
      permissionLoading.value = false;
    }
  }

  async function getPermissions() {
    permissionLoading.value = true;
    const response: any = await getRecordsApi('/permissions');
    permissions.value = response.data;
    permissionLoading.value = false;
  }

  async function getPermissionsOnFocus() {
    if (!permissionsInitialized.value) {
      await getPermissions();
      permissionsInitialized.value = true;
    }
  }

  return {
    permissions,
    permissionLoading,
    permissionsInitialized,
    findPermission,
    getPermissions,
    getPermissionsOnFocus
  };
}
