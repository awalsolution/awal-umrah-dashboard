<template>
  <n-space :vertical="true">
    <n-card style="margin-bottom: 10px" title="Booking Details">
      <n-tabs ref="tabRef" type="card">
        <n-tab-pane name="general" tab="General Details">
          <n-form
            ref="generalForm"
            :label-width="80"
            :model="bookingGeneralDetails"
            :rules="rulesGeneralForm"
            size="small"
          >
            <n-row gutter="12">
              <n-col :span="6">
                <n-form-item label="Customer Name" path="customer_name">
                  <n-input
                    v-model:value="bookingGeneralDetails.customer_name"
                    placeholder="Enter Customer Name"
                  />
                </n-form-item>
              </n-col>
              <n-col :span="6">
                <n-form-item label="Booking Status" path="booking_status">
                  <n-select
                    v-model:value="bookingGeneralDetails.booking_status"
                    :options="[
                      { label: 'Draft', value: 'draft' },
                      { label: 'Processing', value: 'processing' },
                      { label: 'Final', value: 'Final' }
                    ]"
                    filterable
                    placeholder="Search Status"
                  />
                </n-form-item>
              </n-col>
              <n-col :span="6">
                <n-form-item label="Group No" path="group_no">
                  <n-input-number
                    v-model:value="bookingGeneralDetails.group_no"
                    class="w-full"
                    min="0"
                  />
                </n-form-item>
              </n-col>
              <n-col :span="6">
                <n-form-item label="Group Name" path="group_name">
                  <n-input
                    v-model:value="bookingGeneralDetails.group_name"
                    placeholder="Enter Group Name"
                  />
                </n-form-item>
              </n-col>
              <n-col :span="6">
                <n-form-item label="Category" path="category">
                  <n-select
                    v-model:value="bookingGeneralDetails.category"
                    :options="[
                      { label: 'Basic', value: 'basic' },
                      { label: 'Individual', value: 'individual' },
                      { label: 'Premium', value: 'premium' },
                      { label: 'VIP', value: 'vip' }
                    ]"
                    filterable
                    placeholder="Search Category"
                  />
                </n-form-item>
              </n-col>
              <n-col :span="6">
                <n-form-item label="Arrival Date" path="arrival_date">
                  <n-date-picker
                    v-model:formatted-value="bookingGeneralDetails.arrival_date"
                    clearable
                    style="width: 100%"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  />
                </n-form-item>
              </n-col>
              <n-col :span="6">
                <n-form-item label="Expected Departure" path="expected_departure">
                  <n-date-picker
                    v-model:formatted-value="bookingGeneralDetails.expected_departure"
                    clearable
                    style="width: 100%"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  />
                </n-form-item>
              </n-col>
              <n-col :span="6">
                <n-form-item label="Confirmed Ticket" path="confirmed_ticket">
                  <n-switch
                    :checked-value="1"
                    :unchecked-value="0"
                    v-model:value="bookingGeneralDetails.confirmed_ticket"
                  />
                </n-form-item>
              </n-col>
            </n-row>
            <n-space :vertical="true">
              <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
                <n-button :loading="loading" secondary type="info" @click="saveGeneralBooking">
                  <template #icon>
                    <n-icon>
                      <SaveArrowRight20Filled />
                    </n-icon>
                  </template>
                  Update Booking
                </n-button>
              </n-form-item>
            </n-space>
          </n-form>
        </n-tab-pane>
        <n-tab-pane name="hotel" tab="Hotel Details">
          <booking-hotel
            v-if="bookingHotelDetails.length < 3"
            :id="parseInt(route.params.id)"
            @hotelAdded="getBookingData"
          />
          <n-table :bordered="false" :single-line="false">
            <thead>
              <tr>
                <th>Hotel</th>
                <th>City</th>
                <th>Room Type</th>
                <th>Nights</th>
                <th>Check In</th>
                <th>Check Out</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in bookingHotelDetails" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.city }}</td>
                <td>{{ item.room_type }}</td>
                <td>{{ item.nights }}</td>
                <td>{{ item.check_in_date }}</td>
                <td>{{ item.check_out_date }}</td>
              </tr>
            </tbody>
          </n-table>
        </n-tab-pane>
        <n-tab-pane name="members" tab="List Members">
          <n-card class="flex w-full mb-1" title="Members Details">
            <n-row gutter="12">
              <n-col v-for="member of members" :key="member" :span="6">
                <n-card
                  :segmented="{
                    content: true,
                    footer: 'soft'
                  }"
                  :title="member.name"
                >
                  <template #header-extra>
                    <n-button
                      circle
                      secondary
                      strong
                      type="primary"
                      @click="showModel(member, 'info')"
                    >
                      <template #icon>
                        <n-icon>
                          <Info16Filled />
                        </n-icon>
                      </template>
                    </n-button>
                    <n-button
                      circle
                      secondary
                      strong
                      type="success"
                      @click="showModel(member, 'edit')"
                    >
                      <template #icon>
                        <n-icon>
                          <TextBulletListSquareEdit24Regular />
                        </n-icon>
                      </template>
                    </n-button>
                  </template>
                  <n-row v-if="member.hotelDetails?.length">
                    <n-row
                      v-for="hotel in member.hotelDetails"
                      :key="hotel.id"
                      :span="24"
                      class="flex justify-between items-center"
                    >
                      <span>{{ hotel.city }}</span>
                      <span>
                        <n-button
                          circle
                          secondary
                          strong
                          type="primary"
                          @click="showInfoModel(hotel)"
                        >
                          <template #icon>
                            <n-icon>
                              <Info16Filled />
                            </n-icon>
                          </template>
                        </n-button>
                        <n-button
                          v-if="hasPermission(['booking edit member'])"
                          circle
                          secondary
                          strong
                          type="success"
                          @click="actionOperation(member.id, hotel)"
                        >
                          <template #icon>
                            <n-icon>
                              <TextBulletListSquareEdit24Regular />
                            </n-icon>
                          </template>
                        </n-button>
                      </span>
                    </n-row>
                    <n-button
                      v-if="
                        member.hotelDetails.length < 3 && hasPermission(['booking assign hotel'])
                      "
                      round
                      secondary
                      type="info"
                      @click="actionOperation(member.id)"
                    >
                      Assign More Hotel
                    </n-button>
                  </n-row>
                  <n-button
                    v-if="hasPermission(['booking assign hotel']) && !member.hotelDetails?.length"
                    round
                    secondary
                    type="info"
                    @click="actionOperation(member.id)"
                  >
                    Assign Hotel
                  </n-button>
                </n-card>
              </n-col>
            </n-row>
          </n-card>
        </n-tab-pane>
        <n-tab-pane name="add_members" tab="Add Members">
          <add-member :booking-id="route.params.id" @operation="getBookingData()" />
        </n-tab-pane>
      </n-tabs>
    </n-card>
    <n-modal v-model:show="showAssignModal" preset="dialog" style="width: 70%">
      <template #header>
        <div>Assign Hotel</div>
      </template>
      <n-space :vertical="true">
        <assign-hotel
          :id="parseInt(selectedId)"
          :hotel-data="selectedHotel"
          @updated="
            showAssignModal = false;
            getBookingData();
          "
        />
      </n-space>
    </n-modal>
    <n-modal v-model:show="showInfoModal" preset="dialog" style="width: 40%">
      <template #header>
        <div>Member Info</div>
      </template>
      <n-space :vertical="true">
        <member-info :member="selectedId" />
      </n-space>
    </n-modal>
    <n-modal v-model:show="showHotelInfoModal" preset="dialog" style="width: 40%">
      <template #header>
        <div>Hotel Info</div>
      </template>
      <n-space :vertical="true">
        <member-hotel-info :hotel-info="selectedHotel" />
      </n-space>
    </n-modal>
    <n-modal v-model:show="showAddMemberModal" preset="dialog" style="width: 60%">
      <template #header>
        <div>Edit Member</div>
      </template>
      <add-member
        :booking-id="route.params.id"
        :member-data="selectedId"
        @operation="
          showAddMemberModal = false;
          getBookingData();
        "
      />
    </n-modal>
  </n-space>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { type FormInst } from 'naive-ui';
import {
  Info16Filled,
  SaveArrowRight20Filled,
  TextBulletListSquareEdit24Regular
} from '@vicons/fluent';
import { getRecordApi, updateRecordApi } from '@src/api/endpoints';
import MemberHotelInfo from '@src/components/booking/memberHotelInfo.vue';
import AssignHotel from '@src/components/hotels/AssignHotel.vue';
import addMember from '@src/components/booking/addMember.vue';
import MemberInfo from '@src/components/booking/memberInfo.vue';
import { generalFormRules } from '@src/rules/booking';
import BookingHotel from '@src/components/booking/bookingHotel.vue';
import { usePermission } from '@src/hooks/permission/usePermission';

const route: any = useRoute();
const generalForm = ref<FormInst | null>(null);
const showAssignModal: any = ref(false);
const showInfoModal: any = ref(false);
const showAddMemberModal: any = ref(false);
const showHotelInfoModal: any = ref(false);
const selectedId: any = ref(null);
const selectedHotel: any = ref({});
const members: any = ref([]);
const bookingHotelDetails: any = ref([]);
const bookingGeneralDetails: any = ref({});
const loading = ref(false);
const rulesGeneralForm = generalFormRules();
const { hasPermission } = usePermission();

onMounted(async () => {
  await getBookingData();
});

async function getBookingData() {
  if (route.params.id) {
    const res: any = await getRecordApi(`/booking/${route.params.id}`);
    console.log('res ==>', res);
    if (res) {
      bookingGeneralDetails.value = {
        customer_name: res.result.customer_name,
        booking_status: res.result.status,
        group_no: res.result.group_no,
        group_name: res.result.group_name,
        category: res.result.category,
        arrival_date: res.result.arrival_date,
        expected_departure: res.result.expected_departure,
        confirmed_ticket: res.result.confirmed_ticket
      };
      if (res.result.members) {
        members.value = res.result.members;
      }
      if (res.result.bookingHotelDetails) {
        bookingHotelDetails.value = res.result.bookingHotelDetails;
      }
    }
  }
}

async function saveGeneralBooking() {
  loading.value = true;
  const res: any = await updateRecordApi(`/booking/${route.params.id}`, {
    ...bookingGeneralDetails.value,
    type: 'general'
  });
  if (res.code === 200) {
    window['$message'].success(res.message);
  } else {
    window['$message'].error(res.message);
  }

  loading.value = false;
}

const showInfoModel = (hotel = null) => {
  selectedHotel.value = hotel;
  showHotelInfoModal.value = true;
};
const actionOperation = (id: any, hotel = null) => {
  selectedId.value = id;
  selectedHotel.value = hotel;
  showAssignModal.value = true;
};
const showModel = (member: any, type: string) => {
  selectedId.value = member;
  if (type === 'info') {
    showInfoModal.value = true;
  } else if (type === 'edit') {
    showAddMemberModal.value = true;
  }
};
</script>
