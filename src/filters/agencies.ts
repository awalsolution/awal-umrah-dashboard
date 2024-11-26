import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';
import { isEmpty } from 'lodash';

export function useAgenciesfilter() {
  const agencies: any = ref([]);
  const agenciesLoading = ref(false);
  const agenciesInitialized = ref(false);

  async function findAgencies(query: any) {
    if (isEmpty(query)) {
      agencies.value = [];
    } else {
      agenciesLoading.value = true;
      const response: any = await getRecordsApi('/agencies', {
        name: query
      });
      agencies.value = response.data;
      agenciesLoading.value = false;
    }
  }

  async function getAgencies() {
    agenciesLoading.value = true;
    const response: any = await getRecordsApi('/agencies');
    agencies.value = response.data;
    agenciesLoading.value = false;
  }

  async function getAgenciesOnFocus() {
    if (!agenciesInitialized.value) {
      await getAgencies();
      agenciesInitialized.value = true;
    }
  }

  return {
    agencies,
    agenciesLoading,
    agenciesInitialized,
    findAgencies,
    getAgencies,
    getAgenciesOnFocus
  };
}
