import { ref } from 'vue';

export const formRules = ref({
  name: {
    required: true,
    message: 'Please Enter Name',
    trigger: 'blur'
  },
  phone: {
    required: true,
    message: 'Please Enter phone number',
    trigger: 'blur'
  },
  address: {
    required: true,
    message: 'Please Enter address',
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
