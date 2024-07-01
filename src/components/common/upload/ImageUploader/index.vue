<template>
  <n-upload :custom-request="customRequest">
    <n-button>Upload</n-button>
  </n-upload>
</template>

<script lang="ts" setup>
import { useMessage } from 'naive-ui';
import type { UploadCustomRequestOptions } from 'naive-ui';
import { UploadAPI } from '@src/api/upload';

defineProps({
  value: String
});

const emit = defineEmits(['update:value']);

const message = useMessage();

const customRequest = ({ file, onFinish, onError, onProgress }: UploadCustomRequestOptions) => {
  const formData = new FormData();
  formData.append('image', file.file as File);

  UploadAPI.uploadFile(formData, {
    onUploadProgress: (progressEvent: any) => {
      const percentCompleted = Math.ceil((progressEvent.loaded * 100) / progressEvent.total);
      onProgress({ percent: percentCompleted });
    }
  })
    .then((response) => {
      message.success(JSON.stringify(response.message));
      emit('update:value', response.data);
      onFinish();
    })
    .catch((error) => {
      message.error(error.message);
      onError();
    });
};
</script>
