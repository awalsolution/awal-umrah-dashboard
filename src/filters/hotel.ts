import { ref } from 'vue';
import { getRecordsApi } from '@src/api/endpoints';

export function usefilterHotel() {
  const hotels = ref([]);
  const hotelLoading = ref(false);
  const hotelsInitialized = ref(false);

  async function findHotel(query: any) {
    if (query !== '') {
      hotelLoading.value = true;
      const response: any = await getRecordsApi('/hotel', { name: query });
      hotels.value = response.data;
      hotelLoading.value = false;
    } else {
      hotels.value = [];
    }
  }

  async function findCityHotel(query: any) {
    if (query !== '') {
      hotelLoading.value = true;
      const response: any = await getRecordsApi('/hotel', { city: query });
      hotels.value = response.data;
      hotelLoading.value = false;
    } else {
      hotels.value = [];
    }
  }

  async function getHotels() {
    hotelLoading.value = true;
    const response: any = await getRecordsApi('/hotel');
    console.log(response);
    hotels.value = response.data;
    hotelLoading.value = false;
  }

  async function getHotelsOnFocus() {
    if (!hotelsInitialized.value) {
      await getHotels();
      hotelsInitialized.value = true;
    }
  }

  return {
    hotels,
    hotelLoading,
    hotelsInitialized,
    findHotel,
    getHotels,
    getHotelsOnFocus,
    findCityHotel
  };
}
