<template>
  <div>
    <n-card title="Add New Booking">
      <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
        <n-row :gutter="[20, 8]">
          <n-col :span="8">
            <n-form-item label="Customer Name" path="customer_name">
              <n-input v-model:value="formValue.customer_name" placeholder="Enter Name" />
            </n-form-item>
          </n-col>
          <n-col :span="8">
            <n-form-item label="Status" path="status">
              <n-select
                v-model:value="formValue.status"
                :options="[{ label: 'Draft', value: 'draft' }]"
                filterable
                placeholder="Search Status"
              />
            </n-form-item>
          </n-col>
          <n-col :span="8">
            <n-form-item label="Group No" path="group_no">
              <n-input-number v-model:value="formValue.group_no" class="w-full" min="0" />
            </n-form-item>
          </n-col>
          <n-col :span="8">
            <n-form-item label="Group Name" path="group_name">
              <n-input v-model:value="formValue.group_name" placeholder="Enter Group Name" />
            </n-form-item>
          </n-col>
          <n-col :span="8">
            <n-form-item label="Category" path="category">
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
            </n-form-item>
          </n-col>
          <n-col :span="8">
            <n-form-item label="Arrival Date" path="arrival_date">
              <n-date-picker
                v-model:formatted-value="formValue.arrival_date"
                clearable
                style="width: 100%"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
              />
            </n-form-item>
          </n-col>
          <n-col :span="8">
            <n-form-item label="Expected Departure" path="expected_departure">
              <n-date-picker
                v-model:formatted-value="formValue.expected_departure"
                clearable
                style="width: 100%"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
              />
            </n-form-item>
          </n-col>
        </n-row>
        <n-space justify="end">
          <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
            <n-button secondary type="info" @click="handleValidateClick"> Save </n-button>
          </n-form-item>
        </n-space>
      </n-form>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { type FormInst } from 'naive-ui';
import { createRecordApi } from '@src/api/endpoints';
import { generalFormRules } from '@src/rules/booking';

const formRef = ref<FormInst | null>(null);
const formValue: Ref = ref({});
const rules = generalFormRules();

const emits = defineEmits(['created']);

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      createRecordApi('/booking', formValue.value).then((res: any) => {
        window['$message'].success(res.message);
        emits('created', res.data);
      });
    } else {
      console.log(errors);
      window['$message'].error('Please fill out required fields');
    }
  });
};
</script>

<style lang="scss" scoped></style>
