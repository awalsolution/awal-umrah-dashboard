<template>
  <n-form ref="formRef" :label-width="80" :model="profileData" :rules="formRules" size="small">
    <n-card title="Edit Profile">
      <n-row gutter="12">
        <n-col :span="8">
          <n-form-item label="First Name" path="first_name">
            <n-input v-model:value="profileData.first_name" placeholder="Enter First Name" />
          </n-form-item>
        </n-col>
        <n-col :span="8">
          <n-form-item label="Last Name" path="last_name">
            <n-input v-model:value="profileData.last_name" placeholder="Enter Last Name" />
          </n-form-item>
        </n-col>
        <n-col :span="8">
          <n-form-item label="Phone Number" path="phone_number">
            <n-input v-model:value="profileData.phone_number" placeholder="Enter Phone Number" />
          </n-form-item>
        </n-col>
        <n-col :span="8">
          <n-form-item label="Address" path="address">
            <n-input v-model:value="profileData.address" placeholder="Enter Address" />
          </n-form-item>
        </n-col>
        <n-col :span="8">
          <n-form-item label="City" path="city">
            <n-input v-model:value="profileData.city" placeholder="Enter City" />
          </n-form-item>
        </n-col>
        <n-col :span="8">
          <n-form-item label="State" path="state">
            <n-input v-model:value="profileData.state" placeholder="Enter State" />
          </n-form-item>
        </n-col>
        <n-col :span="24">
          <n-form-item label="Country" path="country">
            <n-input v-model:value="profileData.country" placeholder="Enter Country" />
          </n-form-item>
        </n-col>
        <n-col :span="24">
          <ImageUploader v-model:value="profileData.profile_picture" />
        </n-col>
      </n-row>
    </n-card>
    <n-space justify="end" class="mt-4">
      <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
        <n-button secondary type="info" @click="handleValidateClick"> Save</n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { type FormInst } from 'naive-ui';
import { updateRecordApi } from '@src/api/endpoints';
import { ImageUploader } from '@src/components/common/upload';
import { useUserStore } from '@src/store/modules/user';
import { formRules } from '@src/rules/profile';

const formRef = ref<FormInst | null>(null);
const profileData: any = ref({});
const userStore = useUserStore();

const emits = defineEmits(['updated']);

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      updateRecordApi(`/user/profile/${profileData.value.id}`, profileData.value).then(
        (res: any) => {
          window['$message'].success(res.message);
          emits('updated', res.result);
        }
      );
    } else {
      console.log(errors);
      window['$message'].error('Invalid');
    }
  });
};

onMounted(() => {
  profileData.value = userStore.currentUser.profile;
});
</script>

<style lang="scss" scoped></style>
