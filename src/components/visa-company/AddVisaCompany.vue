<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="formRules" size="small">
    <n-row :gutter="[20, 8]">
      <n-col :span="12">
        <n-form-item label="Name" path="name">
          <n-input v-model:value="formValue.name" placeholder="Enter Name" />
        </n-form-item>
      </n-col>
      <n-col :span="12">
        <n-form-item label="Email" path="email">
          <n-input v-model:value="formValue.email" placeholder="Enter Email" />
        </n-form-item>
      </n-col>
      <n-col :span="12">
        <n-form-item label="Phone Number" path="phone_number">
          <n-input v-model:value="formValue.phone_number" placeholder="Enter Phone Number" />
        </n-form-item>
      </n-col>
      <n-col :span="12">
        <n-form-item label="Phone Number" path="phone">
          <n-input v-model:value="formValue.phone" placeholder="Enter Phone Number" />
        </n-form-item>
      </n-col>
      <n-col :span="12">
        <n-form-item label="Address" path="address">
          <n-input v-model:value="formValue.address" placeholder="Enter Address" />
        </n-form-item>
      </n-col>
      <n-col :span="12">
        <n-form-item label="status" path="status">
          <n-switch v-model:value="formValue.status" :checked-value="1" :unchecked-value="0" />
        </n-form-item>
      </n-col>
    </n-row>
    <n-space justify="end">
      <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
        <n-button secondary type="info" @click="handleValidateClick">Save</n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { type FormInst } from 'naive-ui';
import { createRecordApi } from '@src/api/endpoints';
import { formRules } from '@src/rules/visaCompany';

const formRef = ref<FormInst | null>(null);
const formValue: Ref = ref({});

const emits = defineEmits(['created']);

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      createRecordApi('/visa-company', formValue.value).then((res: any) => {
        window['$message'].success(res.message);
        emits('created');
      });
    } else {
      console.log(errors);
      window['$message'].error('Please fill out required fields');
    }
  });
};
</script>

<style lang="scss" scoped></style>
