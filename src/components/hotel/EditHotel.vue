<template>
  <n-card>
    <n-form ref="formRef" :label-width="80" :model="hotel" :rules="formRules">
      <n-space>
        <n-row :gutter="10">
          <n-col :span="12">
            <n-form-item label="Hotel Name" path="name">
              <n-input v-model:value="hotel.name" placeholder="Enter Name" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="Hotel Phone Number" path="phone_number">
              <n-input v-model:value="hotel.phone_number" placeholder="Enter Phone Number" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="Hotel Owner" path="owner">
              <n-input v-model:value="hotel.owner" placeholder="Enter Owner Name" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="Hotel Owner Phone" path="owner_phone">
              <n-input v-model:value="hotel.owner_phone" placeholder="Enter Owner Phone" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="Hotel Address" path="address">
              <n-input v-model:value="hotel.address" placeholder="Enter Address" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="Hotel City" path="city">
              <n-input v-model:value="hotel.city" placeholder="Enter City" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="Hotel State" path="state">
              <n-input v-model:value="hotel.state" placeholder="Enter State" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="Hotel Country" path="country">
              <n-input v-model:value="hotel.country" placeholder="Enter Country" />
            </n-form-item>
          </n-col>
          <n-col :span="12">
            <n-form-item label="status" path="status">
              <n-switch v-model:value="hotel.status" :checked-value="1" :unchecked-value="0" />
            </n-form-item>
          </n-col>
        </n-row>
      </n-space>
      <n-space justify="end" :size="0">
        <n-form-item
          :theme-overrides="{
            feedbackHeightSmall: '0',
            feedbackHeightMedium: '0',
            labelHeightMedium: '0'
          }"
        >
          <n-button secondary type="info" @click="handleValidateClick"> Update</n-button>
        </n-form-item>
      </n-space>
    </n-form>
  </n-card>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { type FormInst } from 'naive-ui';
import { getRecordApi, updateRecordApi } from '@src/api/endpoints';
import { formRules } from '@src/rules/hotel';

const formRef = ref<FormInst | null>(null);
const hotel: Ref = ref({});
const props = defineProps({
  id: {
    type: Number
  }
});

const emits = defineEmits(['updated']);

// fetch single hotel  using id
getRecordApi(`/hotel/${props.id}`).then((res: any) => {
  hotel.value = res.result;
});

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      updateRecordApi(`/hotel/${hotel.value.id}`, hotel.value).then((res: any) => {
        window['$message'].success(res.message);
        emits('updated', res.result);
      });
    } else {
      console.log(errors);
      window['$message'].error('Invalid');
    }
  });
};
</script>

<style lang="less" scoped></style>
