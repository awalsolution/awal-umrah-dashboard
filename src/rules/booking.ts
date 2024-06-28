import { ref } from 'vue';

export function generalFormRules() {
  return ref({
    customer_name: {
      required: true,
      message: 'Please Enter Name',
      trigger: 'blur'
    },
    booking_status: {
      required: true,
      message: 'Please Select Booking Status',
      trigger: 'blur'
    },
    approval_date: {
      required: true,
      message: 'Please Select Booking Status',
      trigger: 'blur'
    },
    expected_departure: {
      required: true,
      message: 'Please Select Booking Status',
      trigger: 'blur'
    }
  });
}

export function mRules() {
  return ref({
    name: {
      required: true,
      message: 'Please Enter Name',
      trigger: 'blur'
    },
    dob: {
      required: true,
      type: 'date',
      message: 'Please Select Date of Birth',
      trigger: 'blur' // or 'change'
    },
    gender: {
      required: true,
      message: 'Please Select Gender',
      trigger: 'blur'
    },
    passport: {
      required: true,
      message: 'Please Enter Passport Number',
      trigger: 'blur'
    },
    issue_date: {
      required: true,
      message: 'Please Select Passport Issue Date',
      trigger: 'blur'
    },
    expiry_date: {
      required: true,
      message: 'Please Select Passport Expiry Date',
      trigger: 'blur'
    },
    iata: {
      required: true,
      message: 'Please Select IATA',
      trigger: 'blur'
    },
    visa_company: {
      required: true,
      message: 'Please Select Visa Company',
      trigger: 'blur'
    },
    visa_status: {
      required: true,
      message: 'Please Select Visa Status',
      trigger: 'blur'
    }
  });
}