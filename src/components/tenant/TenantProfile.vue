<template>
  <div class="text-center text-3xl my-5">Organization Profile</div>
  <div class="grid grid-cols-4 gap-5">
    <div class="col-span-1">
      <img :src="imgUrl + data?.logo" alt="profile logo" />
    </div>
    <div class="col-span-3 grid grid-cols-2 gap-5">
      <InputText v-model="data.phone_number" disabled placeholder="Phone#" fluid />
      <InputText v-model="data.address" disabled placeholder="Address" fluid />
      <InputText v-model="data.city" disabled placeholder="City" fluid />
      <InputText v-model="data.state" disabled placeholder="State" fluid />
      <InputText v-model="data.country" disabled placeholder="Country" fluid />
    </div>
    <Button label="Edit" severity="primary" @click="openEditDialog" />
  </div>
  <Dialog v-model:visible="editDialog" modal header="Edit Profile" class="w-1/2">
    <div class="grid grid-cols-2 gap-5">
      <div class="w-full">
        <label for="phone_number" class="font-semibold">Phone Number</label>
        <InputText id="phone_number" v-model="data.phone_number" fluid placeholder="Phone#" />
      </div>
      <div class="w-full">
        <label for="address" class="font-semibold">Address</label>
        <InputText id="address" v-model="data.address" fluid placeholder="Enter address" />
      </div>
      <div class="w-full">
        <label for="city" class="font-semibold">City</label>
        <InputText id="city" v-model="data.city" fluid placeholder="Enter City" />
      </div>
      <div class="w-full">
        <label for="state" class="font-semibold">State</label>
        <InputText id="state" v-model="data.state" fluid placeholder="Enter State" />
      </div>
      <div class="w-full">
        <label for="country" class="font-semibold">Country</label>
        <InputText id="country" v-model="data.country" fluid placeholder="Enter Country" />
      </div>
    </div>
    <ImageUploader v-model="data.logo" />
    <div class="flex justify-end gap-2 mt-4">
      <Button type="button" label="Cancel" severity="info" @click="hideDialog" />
      <Button type="button" label="Save" severity="primary" @click="saveForm" />
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import { getRecordApi, updateRecordApi } from '@src/api/endpoints';
import { TENANT_API_KEY } from '@src/utils/storage/variables';
import { storage } from '@src/utils/storage';
import { ImageUploader } from '@src/components/upload';
import { useEnv } from '@src/hooks/useEnv';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const { imgUrl } = useEnv();
const editDialog: Ref = ref(false);
const submitted: Ref = ref(false);
const data: Ref = ref({});

const openEditDialog = () => {
  editDialog.value = true;
  submitted.value = false;
};

function hideDialog() {
  editDialog.value = false;
  submitted.value = false;
}

const saveForm = () => {
  submitted.value = true;
  updateRecordApi(`/tenants/edit-single-tenant-profile/${data.value.id}`, data.value).then(
    (res: any) => {
      window.toast('success', 'Profile Information', res.message);
    }
  );
  data.value = {};
  editDialog.value = false;
  getProfileData();
};

const getProfileData = async () => {
  const tenantApiKey = storage.getTenantApiKey(TENANT_API_KEY);
  const res: any = await getRecordApi(`/tenants/find-single-tenant-profile/${tenantApiKey}`);
  data.value = res.data;
};

onMounted(() => {
  getProfileData();
});
</script>

<style lang="scss" scoped></style>
