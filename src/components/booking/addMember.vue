<template>
  <n-form ref="memberForm" :label-width="80" :model="newMember" :rules="rules" size="small">
    <n-card class="flex w-full mb-1" title="General Details">
      <n-row gutter="12">
        <n-col :span="6">
          <n-form-item label="First Name" path="name">
            <n-input v-model:value="newMember.name" placeholder="Enter First Name"/>
          </n-form-item>
        </n-col>
        <n-col :span="6">
          <n-form-item label="DOB" path="dob">
            <n-date-picker
                v-model:formatted-value="newMember.dob"
                class="w-full"
                format="yyyy-MM-dd"
                type="date"
            />
          </n-form-item>
        </n-col>
        <n-col :span="6">
          <n-form-item label="Gender" path="gender">
            <n-select
                v-model:value="newMember.gender"
                :options="[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' }
              ]"
                filterable
                placeholder="Select Option"
            />
          </n-form-item>
        </n-col>
        <n-col :span="6">
          <n-form-item label="Family Head" path="family_head">
            <n-switch
                v-model:value="newMember.family_head"
                :checked-value="1"
                :unchecked-value="0"
            />
          </n-form-item>
        </n-col>
        <n-col :span="6">
          <n-form-item label="Passport" path="passport">
            <n-input v-model:value="newMember.passport" placeholder="Enter Passport"/>
          </n-form-item>
        </n-col>
        <n-col :span="6">
          <n-form-item label="Issue Date" path="issue_date">
            <n-date-picker
                v-model:formatted-value="newMember.issue_date"
                class="w-full"
                type="date"
                value-format="yyyy-MM-dd"
            />
          </n-form-item>
        </n-col>
        <n-col :span="6">
          <n-form-item label="Expiry Date" path="expiry_date">
            <n-date-picker
                v-model:formatted-value="newMember.expiry_date"
                class="w-full"
                type="date"
                value-format="yyyy-MM-dd"
            />
          </n-form-item>
        </n-col>
      </n-row>
    </n-card>
    <n-card style="display: flex; width: 100%; margin-bottom: 10px" title="Visa Details">
      <n-row gutter="12">
        <n-col :span="8">
          <n-form-item label="IATA" path="iata">
            <n-select
                v-model:value="newMember.iata"
                :options="[
                { label: 'Basic', value: 'basic' },
                { label: 'Individual', value: 'individual' },
                { label: 'Premium', value: 'premium' },
                { label: 'VIP', value: 'vip' }
              ]"
                filterable
                placeholder="Select Option"
            />
          </n-form-item>
        </n-col>
        <n-col :span="8">
          <n-form-item label="Visa Company" path="visa_company">
            <n-input v-model:value="newMember.visa_company" placeholder="Enter Visa Company"/>
          </n-form-item>
        </n-col>
        <n-col :span="8">
          <n-form-item label="Visa Status" path="visa_status">
            <n-select
                v-model:value="newMember.visa_status"
                :options="[
                { label: 'Basic', value: 'basic' },
                { label: 'Individual', value: 'individual' },
                { label: 'Premium', value: 'premium' },
                { label: 'VIP', value: 'vip' }
              ]"
                filterable
                placeholder="Select Option"
            />
          </n-form-item>
        </n-col>
      </n-row>
    </n-card>
    <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
      <n-button :loading="loading" secondary type="info" @click="handleValidateClick">
        Save Member
      </n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import {ref, watchEffect} from 'vue';
import {type FormInst} from 'naive-ui';
import {updateRecordApi} from '@src/api/endpoints';
import {mRules} from '@src/rules/booking';

const memberForm = ref<FormInst | null>(null);
const loading = ref(false);
const newMember: any = ref({});
const emits = defineEmits(['operation']);

const props = defineProps({
  bookingId: {
    type: String
  },
  memberData: {
    type: Object,
    default: () => ({
      dob: null,
      gender: '',
      family_head: 0,
      passport: '',
      issue_date: null,
      expiry_date: null,
      iata: '',
      visa_company: '',
      visa_status: ''
    })
  }
});

watchEffect(() => {
  if (props.memberData) {
    newMember.value = {...props.memberData};
  }
});

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  memberForm.value?.validate((errors) => {
    if (!errors) {
      updateRecordApi('/bookings/' + props.bookingId, {
        ...newMember.value,
        type: 'member'
      }).then((res: any) => {
        window['$message'].success(res.message);
        newMember.value = {
          dob: null,
          gender: '',
          family_head: 0,
          passport: '',
          issue_date: null,
          expiry_date: null,
          iata: '',
          visa_company: '',
          visa_status: ''
        };
        emits('operation');
      });
    } else {
      console.log(errors);
      window['$message'].error('Please fill out required fields');
    }
  });
};

const rules = mRules();
</script>

<style lang="scss" scoped></style>
