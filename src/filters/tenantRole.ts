import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';
import { isEmpty } from 'lodash';

export function useTenantRolefilter() {
  const roles: any = ref([]);
  const roleLoading = ref(false);
  const rolesInitialized = ref(false);

  async function findRole(query: any, db_name: any) {
    if (isEmpty(query)) {
      roles.value = [];
    } else {
      roleLoading.value = true;
      const response: any = await getRecordsApi('/tenant/find-roles-of-tenant', {
        name: query,
        db_name: db_name
      });
      roles.value = response.data;
      roleLoading.value = false;
    }
  }

  async function getRoles(db_name: any) {
    roleLoading.value = true;
    const response: any = await getRecordsApi('/tenant/find-roles-of-tenant', { db_name: db_name });
    roles.value = response.data;
    roleLoading.value = false;
  }

  async function getRolesOnFocus(db_name: any) {
    console.log('db_name ==>', db_name);
    if (!rolesInitialized.value) {
      await getRoles(db_name);
      rolesInitialized.value = true;
    }
  }

  return {
    roles,
    roleLoading,
    rolesInitialized,
    findRole,
    getRoles,
    getRolesOnFocus
  };
}
