import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';
import { isEmpty } from 'lodash';

export function usePlanfilter() {
  const plans: any = ref([]);
  const planLoading = ref(false);
  const plansInitialized = ref(false);

  async function findPlan(query: any) {
    if (isEmpty(query)) {
      plans.value = [];
    } else {
      planLoading.value = true;
      const response: any = await getRecordsApi('/plans', { name: query });
      plans.value = response.data;
      planLoading.value = false;
    }
  }

  async function getPlans() {
    planLoading.value = true;
    const response: any = await getRecordsApi('/plans');
    console.log('plan data =>', response);
    plans.value = response.data;
    planLoading.value = false;
  }

  async function getPlansOnFocus() {
    if (!plansInitialized.value) {
      await getPlans();
      plansInitialized.value = true;
    }
  }
  return {
    plans,
    planLoading,
    plansInitialized,
    findPlan,
    getPlans,
    getPlansOnFocus
  };
}
