<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="formRules" size="small">
    <n-row :gutter="[20, 8]">
      <n-col :span="12">
        <n-form-item label="Agency Name" path="agency_name">
          <n-input v-model:value="formValue.agency_name" placeholder="Enter Name" />
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
        <n-form-item label="City" path="city">
          <n-input v-model:value="formValue.city" placeholder="Enter City" />
        </n-form-item>
      </n-col>
      <n-col :span="12">
        <n-form-item label="State" path="state">
          <n-input v-model:value="formValue.state" placeholder="Enter State" />
        </n-form-item>
      </n-col>
      <n-col :span="12">
        <n-form-item label="Country" path="country">
          <n-input v-model:value="formValue.country" placeholder="Enter Country" />
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
        <n-button secondary type="info" @click="handleValidateClick">Update</n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { type FormInst } from 'naive-ui';
import { getRecordApi, updateRecordApi } from '@src/api/endpoints';
import { formRules } from '@src/rules/agency';

const formRef = ref<FormInst | null>(null);
const formValue: any = ref({});

const emits = defineEmits(['updated']);

const props = defineProps({
  id: {
    type: Number
  }
});

// fetch single plan  using id
getRecordApi(`/agencies/${props.id}`).then((res: any) => {
  formValue.value = res.data;
});

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      updateRecordApi(`/agencies/${formValue.value.id}`, formValue.value).then((res: any) => {
        window['$message'].success(res.message);
        emits('updated', res.data);
      });
    } else {
      console.log(errors);
      window['$message'].error('Invalid');
    }
  });
};
</script>

<style lang="scss" scoped></style>
