import { ref } from 'vue';

export function formRules() {
  return ref({
    room_type: {
      required: true,
      message: 'Please Select Room Type',
      trigger: 'blur'
    },
    room_no: {
      required: true,
      message: 'Please Enter Room Number',
      trigger: 'blur'
    },
    floor_no: {
      required: true,
      message: 'Please Enter Floor Number',
      trigger: 'blur'
    }
  });
}
