import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';

export function usefilterBed() {
  const beds: any = ref([]);
  const bedLoading = ref(false);
  const bedsInitialized = ref(false);

  async function findBed(query: any) {
    if (query !== '') {
      bedLoading.value = true;
      const response: any = await getRecordsApi('/bed', { name: query });
      beds.value = response.result;
      bedLoading.value = false;
    } else {
      beds.value = [];
    }
  }

  async function findBedByRoom(roomId: any, status = 'available') {
    if (!roomId) {
      window['$message'].error('Please Select Room First');
      return;
    }
    if (roomId !== '' || status !== '') {
      bedLoading.value = true;
      const response: any = await getRecordsApi('/bed', {
        room_id: roomId,
        status: status
      });
      beds.value = response.result;
      bedLoading.value = false;
    } else {
      beds.value = [];
    }
  }

  async function getBeds() {
    bedLoading.value = true;
    beds.value = await getRecordsApi('/bed');
    bedLoading.value = false;
  }

  async function getBedsOnFocus() {
    if (!bedsInitialized.value) {
      await getBeds();
      bedsInitialized.value = true;
    }
  }

  return {
    beds,
    bedLoading,
    bedsInitialized,
    findBed,
    getBeds,
    getBedsOnFocus,
    findBedByRoom
  };
}
