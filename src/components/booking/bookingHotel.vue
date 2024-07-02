<template>
  <n-card class="flex w-full mb-1">
    <n-form ref="formRef" :label-width="80" :model="bookingHotel" :rules="hotelDetailRules">
      <n-row gutter="12">
        <n-col :span="4">
          <n-form-item label="Hotel City" path="city">
            <n-select
              v-model:value="bookingHotel.city"
              placeholder="Select City"
              clearable
              @update:value="findCityHotel(bookingHotel.city)"
              :options="[
                { label: 'Madina', value: 'madina' },
                { label: 'Makkah', value: 'makkah' }
              ]"
            />
          </n-form-item>
        </n-col>
        <n-col :span="4">
          <n-form-item label="Hotel" path="name">
            <n-select
              :filterable="true"
              :tag="false"
              placeholder="Select Hotel"
              v-model:value="bookingHotel.name"
              clearable
              :remote="true"
              label-field="name"
              value-field="name"
              :loading="hotelLoading"
              :options="hotels"
            />
          </n-form-item>
        </n-col>
        <n-col :span="4">
          <n-form-item label="Room Type" path="room_type">
            <n-select
              v-model:value="bookingHotel.room_type"
              filterable
              placeholder="Select Room Type"
              :options="[
                { label: 'Double Bed', value: 'double bed' },
                { label: 'Quad Bed', value: 'quad bed' },
                { label: 'Quint Bed', value: 'quint bed' },
                { label: 'Sharing', value: 'sharing' },
                { label: 'Six Bed', value: 'six bed' },
                { label: 'Triple Bed', value: 'triple bed' }
              ]"
            />
          </n-form-item>
        </n-col>
        <n-col :span="4">
          <n-form-item label="Nights" path="nights">
            <n-input-number class="w-full" v-model:value="bookingHotel.nights" min="0" />
          </n-form-item>
        </n-col>
        <n-col :span="4">
          <n-form-item label="CheckIn Date" path="check_in_date">
            <n-date-picker
              style="width: 100%"
              v-model:formatted-value="bookingHotel.check_in_date"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              clearable
            />
          </n-form-item>
        </n-col>
        <n-col :span="4">
          <n-form-item label="CheckOut Date" path="check_out_date">
            <n-date-picker
              style="width: 100%"
              v-model:formatted-value="bookingHotel.check_out_date"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              clearable
            />
          </n-form-item>
        </n-col>
      </n-row>
      <n-form-item
        :theme-overrides="{
          feedbackHeightSmall: '0',
          feedbackHeightMedium: '0',
          labelHeightMedium: '0'
        }"
      >
        <button :loading="loading" type="button" class="edit_btn" @click="handleValidateClick">
          Save Hotel
        </button>
      </n-form-item>
    </n-form>
  </n-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { type FormInst } from 'naive-ui';
import { usefilterHotel } from '@src/filters/hotel';
import { updateRecordApi } from '@src/api/endpoints';
import { hotelDetailRules } from '@src/rules/booking';

const formRef = ref<FormInst | null>(null);
const bookingHotel: any = ref({
  city: null,
  name: null,
  nights: 0,
  check_in_date: null,
  check_out_date: null
});
const loading = ref(false);
const emits = defineEmits(['hotelAdded']);
const { hotels, hotelLoading, findCityHotel } = usefilterHotel();
const props = defineProps({
  id: {
    type: Number
  }
});

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      updateRecordApi(`/booking/${props.id}`, {
        ...bookingHotel.value,
        type: 'booking hotel'
      }).then((res: any) => {
        window['$message'].success(res.message);
        bookingHotel.value = {
          city: null,
          name: null,
          nights: 0,
          check_in_date: null,
          check_out_date: null
        };
        emits('hotelAdded');
      });
    } else {
      console.log(errors);
      window['$message'].error('Please fill out required fields');
    }
  });
};
</script>

<style lang="scss" scoped>
.edit_btn {
  @apply text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded text-sm px-5 py-2 text-center;
}
</style>
