<template>
  <n-card
    :title="member?.name"
    :segmented="{
      content: true,
      footer: 'soft'
    }"
  >
    <template #header-extra>
      <n-tag v-if="member?.family_head" type="success" size="large" round> Family Head</n-tag>
    </template>
    <n-row class="flex justify-between items-center pb-1">
      <n-col :span="18">Date Of Birth</n-col>
      <n-col :span="6">
        <n-tag type="info" size="small" round>
          {{ member?.dob }}
        </n-tag>
      </n-col>
    </n-row>
    <n-row class="flex justify-between items-center pb-1">
      <n-col :span="18">Gender</n-col>
      <n-col :span="6">
        <n-tag type="info" size="small" round>
          {{ member?.gender }}
        </n-tag>
      </n-col>
    </n-row>
    <n-row class="flex justify-between items-center pb-1">
      <n-col :span="18">Passport No</n-col>
      <n-col :span="6">
        <n-tag type="info" size="small" round>
          {{ member?.passport }}
        </n-tag>
      </n-col>
    </n-row>
    <n-row class="flex justify-between items-center pb-1">
      <n-col :span="18">Passport Issue Date</n-col>
      <n-col :span="6">
        <n-tag type="info" size="small" round>
          {{ member?.issue_date }}
        </n-tag>
      </n-col>
    </n-row>
    <n-row class="flex justify-between items-center pb-1">
      <n-col :span="18">Passport Expiry Date</n-col>
      <n-col :span="6">
        <n-tag type="info" size="small" round>
          {{ member?.expiry_date }}
        </n-tag>
      </n-col>
    </n-row>
    <n-row class="flex justify-between items-center pb-1">
      <n-col :span="18">IATA</n-col>
      <n-col :span="6">
        <n-tag type="info" size="small" round>
          {{ member?.iata }}
        </n-tag>
      </n-col>
    </n-row>
    <n-row class="flex justify-between items-center pb-1">
      <n-col :span="18">Visa Company</n-col>
      <n-col :span="6">
        <n-tag type="info" size="small" round>
          {{ member?.visa_company }}
        </n-tag>
      </n-col>
    </n-row>
    <n-row class="flex justify-between items-center pb-1">
      <n-col :span="18">Visa Status</n-col>
      <n-col :span="6">
        <n-tag type="info" size="small" round>
          {{ member?.visa_status }}
        </n-tag>
      </n-col>
    </n-row>
  </n-card>
</template>

<script lang="ts" setup>
defineProps({
  member: {
    type: Object
  }
});
</script>

<style lang="scss" scoped></style>
