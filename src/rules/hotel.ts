import { ref } from 'vue';

export function formRules() {
  return ref({
    name: {
      required: true,
      message: 'Please Enter name',
      trigger: 'blur'
    },
    phone_number: {
      required: true,
      message: 'Please Select phone number',
      trigger: 'blur'
    },
    owner: {
      required: true,
      message: 'Please Enter owner name',
      trigger: 'blur'
    },
    owner_phone: {
      required: true,
      message: 'Please Enter owner phone number',
      trigger: 'blur'
    },
    address: {
      required: true,
      message: 'Please Enter street no',
      trigger: 'blur'
    },
    city: {
      required: true,
      message: 'Please Enter city',
      trigger: 'blur'
    },
    state: {
      required: true,
      message: 'Please Enter state',
      trigger: 'blur'
    },
    country: {
      required: true,
      message: 'Please Enter country',
      trigger: 'blur'
    }
  });
}

export const assignHotelRules = ref({
  city: {
    required: true,
    message: 'Please Select City',
    trigger: 'blur'
  },
  hotel_id: {
    type: 'number',
    required: true,
    message: 'Please Select Hotel',
    trigger: 'change'
  },
  room_type: {
    required: true,
    message: 'Please Select Room Type',
    trigger: 'blur'
  },
  room_id: {
    type: 'number',
    required: true,
    message: 'Please Select Room',
    trigger: 'blur'
  },
  bed_id: {
    type: 'number',
    required: true,
    message: 'Please Select Bed',
    trigger: 'blur'
  },
  nights: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: 'Please Input Nights'
  },
  check_in_date: {
    required: true,
    message: 'Please Select Check In Date',
    trigger: 'blur'
  },
  check_out_date: {
    required: true,
    message: 'Please Select Check Out Date',
    trigger: 'blur'
  }
});
