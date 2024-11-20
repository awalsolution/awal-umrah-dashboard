import { ref, watch } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';

export function usePagination(endpoint: any) {
  const list = ref([]);
  const page = ref(1);
  const searchParams = ref({});
  const emptyState = ref(false);
  const itemCount = ref(0);
  const pageSizes = ref([10, 20, 30, 40, 50, 100]);
  const perPage = ref(50);
  const getList = () => {
    getRecordsApi(endpoint, {
      ...searchParams.value,
      page: page.value,
      perPage: perPage.value
    }).then((res: any) => {
      console.log('record list => ', res);
      list.value = res.data.data;
      itemCount.value = res.data.meta.total;
      if (res.data.meta.total === 0) {
        emptyState.value = true;
      }
    });
  };
  watch([page, perPage], (value, oldValue) => {
    page.value = value[1] !== oldValue[1] ? 1 : page.value;
    getList();
  });
  return {
    getList,
    emptyState,
    list,
    page,
    pageSizes,
    itemCount,
    perPage,
    searchParams
  };
}
