<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="formRules" size="small">
    <n-row :gutter="[20, 8]">
      <n-col :span="12">
        <n-form-item label="Agency Name" path="name">
          <n-input v-model:value="formValue.name" placeholder="Enter Name" />
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
    </n-row>
    <n-space justify="end">
      <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
        <n-button secondary type="info" @click="handleValidateClick"> Save </n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { type FormInst } from 'naive-ui';
import { createRecordApi } from '@src/api/endpoints';
import { formRules } from '@src/rules/agency';

const router = useRouter();
const formRef = ref<FormInst | null>(null);
const formValue: Ref = ref({});

// const emits = defineEmits(['created']);

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      createRecordApi('/agencies', formValue.value).then((res: any) => {
        window['$message'].success(res.message);
        router.push({
          name: 'agencies_list'
        });
        // emits('created', res.data);
      });
    } else {
      console.log(errors);
      window['$message'].error('Please fill out required fields');
    }
  });
};
</script>

<style lang="scss" scoped></style>
