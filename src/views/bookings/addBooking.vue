<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
    <n-grid x-gap="10">
      <n-form-item-gi :span="8" label="Customer Name" path="customer_name">
        <n-input v-model:value="formValue.customer_name" placeholder="Enter Customer Name" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="Booking Status" path="status">
        <n-select
          v-model:value="formValue.status"
          :options="[
            { label: 'Draft', value: 'draft' },
            { label: 'Processing', value: 'processing' },
            { label: 'Final', value: 'final' }
          ]"
          filterable
          placeholder="Search Status"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="Group No" path="group_no">
        <n-input-number v-model:value="formValue.group_no" class="w-full" min="0" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="Group Name" path="group_name">
        <n-input v-model:value="formValue.group_name" placeholder="Enter Group Name" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="Category" path="category">
        <n-select
          v-model:value="formValue.category"
          :options="[
            { label: 'Basic', value: 'basic' },
            { label: 'Individual', value: 'individual' },
            { label: 'Premium', value: 'premium' },
            { label: 'VIP', value: 'vip' }
          ]"
          filterable
          placeholder="Search Category"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="Arrival Date" path="arrival_date">
        <n-date-picker
          v-model:formatted-value="formValue.approval_date"
          clearable
          style="width: 100%"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="Expected Departure" path="expected_departure">
        <n-date-picker
          v-model:formatted-value="formValue.expected_departure"
          clearable
          style="width: 100%"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </n-form-item-gi>
    </n-grid>
    <n-space justify="end">
      <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
        <n-button secondary type="info" @click="saveBooking"> Create Booking</n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { type FormInst } from 'naive-ui';
import { createRecordApi } from '@src/api/endpoints';
import { generalFormRules } from '@src/rules/booking';

const router = useRouter();
const formRef = ref<FormInst | null>(null);
const formValue: any = ref({});
const loading = ref(false);
const rules = generalFormRules();

async function saveBooking() {
  formRef.value?.validate(async (errors) => {
    if (errors) {
      console.log(errors);
      window['$message'].error('Please fill out required fields');
    } else {
      loading.value = true;
      const response: any = await createRecordApi('/bookings', { ...formValue.value });
      window['$message'].success(response.message);
      await router.push({ name: 'booking' });
      loading.value = false;
    }
  });
}
</script>
