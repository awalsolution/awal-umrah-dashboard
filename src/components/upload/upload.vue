<template>
  <div class="file-uploader flex gap-6 mt-4 items-center">
    <img
      v-if="previewUrl"
      :src="imgUrl + previewUrl"
      alt="Uploaded Image Preview"
      class="shadow-md rounded-xl size-16"
    />
    <FileUpload
      mode="basic"
      auto
      severity="primary"
      accept="image/*"
      name="image"
      :custom-upload="true"
      @uploader="handleImageUploadRequest"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, type Ref } from 'vue';
import { useEnv } from '@src/hooks/useEnv';
import FileUpload from 'primevue/fileupload';
import { UploadAPI } from '@src/api/upload';

const props = defineProps({
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const { imgUrl } = useEnv();
const previewUrl: Ref = ref(props.modelValue || null);

watch(
  () => props.modelValue,
  (newValue) => {
    previewUrl.value = newValue;
  }
);

// Custom uploader handler for the PrimeVue FileUpload component
const handleImageUploadRequest = async (event: any) => {
  try {
    const formData = new FormData();
    formData.append('image', event.files[0]);

    const response: any = await UploadAPI.uploadFile(formData);

    if (response.data) {
      previewUrl.value = response.data;
      emit('update:modelValue', response.data);
      window.toast('success', 'File Uploaded', response.message);
    } else {
      window.toast('error', 'Upload Failed', response.message || 'Unknown error occurred.');
    }
  } catch (error) {
    console.error('File upload failed:', error);
    window.toast('error', 'Upload Error', 'An error occurred while uploading the file.');
  }
};
</script>

<style lang="scss" scoped></style>

<!-- <template>
  <div class="file-uploader flex gap-6 mt-4 items-center">
    <img
      v-if="previewUrl"
      :src="imgUrl + previewUrl"
      alt="Uploaded Image Preview"
      class="shadow-md rounded-xl size-16"
    />
    <FileUpload
      mode="basic"
      auto
      severity="primary"
      accept="image/*"
      @upload="handleUpload"
      :url="uploadUrl"
      name="image"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, type Ref } from 'vue';
import { useEnv } from '@src/hooks/useEnv';
import FileUpload from 'primevue/fileupload';

const props = defineProps({
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const { imgUrl, uploadUrl } = useEnv();
const previewUrl: Ref = ref(props.modelValue || null);

watch(
  () => props.modelValue,
  (newValue) => {
    previewUrl.value = newValue;
  }
);

const handleUpload = (e: any) => {
  const response = e.xhr.response;
  let res;
  try {
    res = JSON.parse(response);
    previewUrl.value = res.data;
    emit('update:modelValue', res.data);
    window.toast('success', 'Success Message', res.message);
  } catch (error) {
    console.error('Failed to parse JSON response:', error);
  }
};
</script>

<style lang="scss" scoped></style> -->
