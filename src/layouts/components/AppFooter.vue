<template>
  <div class="layout-footer">
    {{ appTitle }} Powerd by
    <a :href="appUrl" target="_blank" class="text-primary font-bold hover:underline">
      {{ teamName }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { useEnv } from '@src/hooks/useEnv';

const { appTitle, teamName, appUrl } = useEnv();
</script>
