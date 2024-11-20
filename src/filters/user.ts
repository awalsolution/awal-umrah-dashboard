import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';
import { isEmpty } from 'lodash';

export function useUserfilter() {
  const users: any = ref([]);
  const userLoading = ref(false);
  const usersInitialized = ref(false);

  async function findUser(query: any) {
    if (isEmpty(query)) {
      users.value = [];
    } else {
      userLoading.value = true;
      const response: any = await getRecordsApi('/users', { name: query });
      users.value = response.data?.data;
      userLoading.value = false;
    }
  }

  async function getUsers() {
    userLoading.value = true;
    const response: any = await getRecordsApi('/users');
    users.value = response.data?.data;
    userLoading.value = false;
  }

  async function getUsersOnFocus() {
    if (!usersInitialized.value) {
      await getUsers();
      usersInitialized.value = true;
    }
  }
  return {
    users,
    userLoading,
    usersInitialized,
    findUser,
    getUsers,
    getUsersOnFocus
  };
}
