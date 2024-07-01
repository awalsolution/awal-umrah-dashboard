<template>
  <n-card class="flex w-full mb-1">
    <n-form ref="formRef" :label-width="80" :model="bookingHotel" :rules="rules">
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
        <n-button :loading="loading" type="success" @click="handleValidateClick">
          <template #icon>
            <n-icon>
              <SaveArrowRight20Filled />
            </n-icon>
          </template>
          Save Hotel
        </n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { type FormInst } from 'naive-ui';
import { usefilterHotel } from '@src/filters/hotel';
import { SaveArrowRight20Filled } from '@vicons/fluent';
import { updateRecordApi } from '@src/api/endpoints';

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
      updateRecordApi(`/bookings/${props.id}`, {
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

const rules = ref({
  city: {
    required: true,
    message: 'Please Select City',
    trigger: 'blur'
  },
  hotelId: {
    type: 'number',
    required: true,
    message: 'Please Select Hotel',
    trigger: 'change'
  },
  room_type: {
    required: true,
    message: 'Please Select Room Type',
    trigger: 'blur'
  },
  nights: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Please Input Nights'
  },
  check_in_date: {
    required: true,
    message: 'Please Select Check In Date',
    trigger: 'blur'
  },
  check_out_date: {
    required: true,
    message: 'Please Select Check Out Date',
    trigger: 'blur'
  }
});
</script>

<style lang="less" scoped></style>
