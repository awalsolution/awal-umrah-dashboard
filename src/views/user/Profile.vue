<template>
  <div class="text-center text-3xl my-5">Organization Profile</div>
  <div class="grid grid-cols-4 gap-5">
    <div class="col-span-1">
      <img :src="imgUrl + data?.profile_picture" alt="profile picture" />
    </div>
    <div class="col-span-3 grid grid-cols-2 gap-5">
      <InputText v-model="data.name" disabled placeholder="Name" fluid />
      <InputText v-model="data.email" disabled placeholder="Email" fluid />
      <InputText v-model="data.phone_number" disabled placeholder="Phone Number" fluid />
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
        <label for="name" class="font-semibold">Name</label>
        <InputText id="name" v-model="data.name" fluid placeholder="Name" />
      </div>
      <div class="w-full">
        <label for="phone_number" class="font-semibold">Phone Number</label>
        <InputText id="phone_number" v-model="data.phone_number" fluid placeholder="Phone Number" />
      </div>
      <div class="w-full">
        <label for="address" class="font-semibold">Address</label>
        <InputText id="address" v-model="data.address" fluid placeholder="Address" />
      </div>
      <div class="w-full">
        <label for="city" class="font-semibold">City</label>
        <InputText id="city" v-model="data.city" fluid placeholder="City" />
      </div>
      <div class="w-full">
        <label for="state" class="font-semibold">State</label>
        <InputText id="state" v-model="data.state" fluid placeholder="State" />
      </div>
      <div class="w-full">
        <label for="country" class="font-semibold">Country</label>
        <InputText id="country" v-model="data.country" fluid placeholder="Country" />
      </div>
    </div>
    <ImageUploader v-model="data.profile_picture" />
    <div class="flex justify-end gap-2 mt-4">
      <Button type="button" label="Cancel" severity="info" @click="hideDialog" />
      <Button type="button" label="Save" severity="primary" @click="saveForm" />
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import { useUserStore } from '@src/store/modules/user';
import { updateRecordApi } from '@src/api/endpoints';
import { ImageUploader } from '@src/components/upload';
import { useEnv } from '@src/hooks/useEnv';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const { imgUrl } = useEnv();
const userStore = useUserStore();
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
  updateRecordApi(`/users/profile/${data.value.id}`, data.value).then((res: any) => {
    window.toast('success', 'Profile Information', res.message);
  });
  editDialog.value = false;
  data.value = {};
  getProfileDataFromStore();
};

const getProfileDataFromStore = () => {
  data.value = userStore.currentUser;
};

onMounted(() => {
  getProfileDataFromStore();
});
</script>

<style lang="scss" scoped></style>
