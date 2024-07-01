<template>
  <n-card
    :title="String(hotelInfo.hotel?.name)"
    :segmented="{
      content: true,
      footer: 'soft'
    }"
  >
    <template #header-extra>
      <n-tag type="success" size="large" round>{{ hotelInfo?.city }}</n-tag>
    </template>
    <n-row class="flex justify-between items-center pb-1">
      <n-col :span="18">Room Type</n-col>
      <n-col :span="6">
        <n-tag type="info" size="small" round>
          {{ hotelInfo.room_type }}
        </n-tag>
      </n-col>
    </n-row>
    <n-row class="flex justify-between items-center pb-1">
      <n-col :span="18">Floor</n-col>
      <n-col :span="6">
        <n-tag type="info" size="small" round>
          {{ hotelInfo.room?.floor_no }}
        </n-tag>
      </n-col>
    </n-row>
    <n-row class="flex justify-between items-center pb-1">
      <n-col :span="18">Room</n-col>
      <n-col :span="6">
        <n-tag type="info" size="small" round>
          {{ hotelInfo.room?.room_no }}
        </n-tag>
      </n-col>
    </n-row>
    <n-row class="flex justify-between items-center pb-1">
      <n-col :span="18">Bed</n-col>
      <n-col :span="6">
        <n-tag type="info" size="small" round>
          {{ hotelInfo.bed?.name }}
        </n-tag>
      </n-col>
    </n-row>
    <n-row class="flex justify-between items-center pb-1">
      <n-col :span="18">No of Nights</n-col>
      <n-col :span="6">
        <n-tag type="info" size="small" round>
          {{ hotelInfo.nights }}
        </n-tag>
      </n-col>
    </n-row>
    <n-row class="flex justify-between items-center pb-1">
      <n-col :span="18">CheckIn Date</n-col>
      <n-col :span="6">
        <n-tag type="info" size="small" round>
          {{ hotelInfo.check_in_date }}
        </n-tag>
      </n-col>
    </n-row>
    <n-row class="flex justify-between items-center pb-1">
      <n-col :span="18">CheckOut Date</n-col>
      <n-col :span="6">
        <n-tag type="info" size="small" round>
          {{ hotelInfo.check_out_date }}
        </n-tag>
      </n-col>
    </n-row>
  </n-card>
</template>

<script lang="ts" setup>
defineProps({
  hotelInfo: {
    type: Object,
    default: () => ({
      check_out_date: null
    })
  }
});
</script>

<style lang="scss" scoped></style>
