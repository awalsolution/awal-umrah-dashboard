import { ref } from 'vue';

export const formRules = ref({
  name: {
    required: true,
    message: 'Please Enter Name',
    trigger: 'blur'
  },
  email: {
    required: true,
    message: 'Please Enter Email',
    trigger: 'blur'
  },
  phone1: {
    required: true,
    message: 'Please Enter phone number',
    trigger: 'blur'
  },
  address: {
    required: true,
    message: 'Please Enter address',
    trigger: 'blur'
  }
});
