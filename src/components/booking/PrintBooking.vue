<template>
  <n-button v-print="'#printMe'" type="primary">Print</n-button>
  <div id="printMe">
    <n-table :bordered="false" :single-line="false">
      <thead>
        <tr>
          <th>Family Head: {{ printData.customer_name }}</th>
          <th>HUKMBFVDDFGF</th>
          <th>Manual No:</th>
        </tr>
      </thead>
      <tbody></tbody>
    </n-table>
    <n-space class="bg-gray-300" justify="center">
      <b>Members</b>
    </n-space>
    <n-table :bordered="false" :single-line="false">
      <thead>
        <tr>
          <th>Passport</th>
          <th>Member Name</th>
          <th>Group No</th>
          <th>Manual No:</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in printData.members" :key="item.id">
          <td>{{ item.passport }}</td>
          <td>{{ item.name }}</td>
          <td>{{ printData.group_no }}</td>
          <td>...</td>
        </tr>
      </tbody>
    </n-table>
    <n-space class="bg-gray-300" justify="center">
      <b>Hotel Details</b>
    </n-space>
    <n-table :bordered="false" :single-line="false">
      <thead>
        <tr>
          <th>City</th>
          <th>Hotel Name</th>
          <th>Room Type</th>
          <th>Nights</th>
          <th>Check In Date</th>
          <th>Check Out Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in printData.bookingHotelDetails" :key="item.id">
          <td>{{ item.city }}</td>
          <td>{{ item.hotel_id }}</td>
          <td>{{ item.room_type }}</td>
          <td>{{ item.nights }}</td>
          <td>{{ item.check_in_date }}</td>
          <td>{{ item.check_out_date }}</td>
        </tr>
      </tbody>
    </n-table>
    <n-space class="bg-gray-300" justify="center">
      <b>Transport/Services</b>
    </n-space>
    <n-table :bordered="false" :single-line="false">
      <thead>
        <tr>
          <th>Transporter</th>
          <th>Type</th>
          <th>Description</th>
          <th>BRN</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Test Transporter</td>
          <td>Economy By Bus</td>
          <td>Test Description By Admin</td>
          <td>...</td>
        </tr>
      </tbody>
    </n-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getRecordApi } from '@src/api/endpoints';

interface PrintData {
  customer_name: string;
  members: Array<{
    id: number;
    passport: string;
    name: string;
  }>;
  group_no: number;
  bookingHotelDetails: Array<{
    id: number;
    city: string;
    hotel_id: string;
    room_type: string;
    nights: number;
    check_in_date: string;
    check_out_date: string;
  }>;
  // Add other properties as needed
}

const route = useRoute();
const printData = ref<Partial<PrintData>>({});
onMounted(async () => {
  await getRecordApi('/booking/' + route.params.id).then((res: any) => {
    printData.value = res.data;
  });
});
</script>

<style lang="scss"></style>
