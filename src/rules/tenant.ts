import { ref } from 'vue';

export const formRules = ref({
  tenant_name: {
    required: true,
    message: 'Please Enter Organization Name',
    trigger: 'blur'
  },
  domain_name: {
    required: true,
    message: 'Please Enter Domain Name',
    trigger: 'blur'
  },
  email: {
    required: true,
    message: 'Please Enter Email',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: 'Please Enter Password',
    trigger: 'blur'
  },
  password_confirmation: {
    required: true,
    message: 'Please Enter Password Confirmation',
    trigger: 'blur'
  },
  first_name: {
    required: true,
    message: 'Please Enter First Name',
    trigger: 'blur'
  },
  last_name: {
    required: true,
    message: 'Please Enter Last Name',
    trigger: 'blur'
  },
  phone_number: {
    required: true,
    message: 'Please Enter Phone',
    trigger: 'blur'
  },
  address: {
    required: true,
    message: 'Please Enter Address',
    trigger: 'blur'
  },
  city: {
    required: true,
    message: 'Please Enter City',
    trigger: 'blur'
  },
  state: {
    required: true,
    message: 'Please Enter State',
    trigger: 'blur'
  },
  country: {
    required: true,
    message: 'Please Enter Country',
    trigger: 'blur'
  }
});
