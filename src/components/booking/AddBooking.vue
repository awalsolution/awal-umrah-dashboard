<template>
  <Card>
    <template #content>
      <Divider
        align="center"
        type="dotted"
        :dt="{ root: { borderColor: '{primary.color}' }, horizontal: { margin: '0 0 2rem 0' } }"
      >
        <b class="text-xl">Add Booking</b>
      </Divider>
      <Form
        v-slot="$form: any"
        :resolver="resolver"
        :initialValues="formValues"
        @submit="onFormSubmit"
      >
        <div class="grid grid-cols-3 gap-5">
          <div class="flex flex-col gap-1">
            <label for="agency_id" class="block font-semibold mb-1">Select Agency</label>
            <Select
              id="agency_id"
              name="agency_id"
              :options="agencies"
              option-label="name"
              option-value="id"
              placeholder="Select Agency"
              variant="filled"
              fluid
            />
            <Message v-if="$form.agency_id?.invalid" severity="error" size="small" variant="simple">
              {{ $form.agency_id.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="booking_no" class="block font-semibold mb-1">Booking No</label>
            <InputText
              id="booking_no"
              name="booking_no"
              placeholder="Enter Booking No"
              variant="filled"
              fluid
            />
            <Message
              v-if="$form.booking_no?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.booking_no.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="group_head" class="block font-semibold mb-1">Group Head Name</label>
            <InputText
              id="group_head"
              name="group_head"
              placeholder="Enter Group Name"
              variant="filled"
              fluid
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="arrival_date" class="block font-semibold mb-1">Arrival Date</label>
            <DatePicker
              inputId="arrival_date"
              name="arrival_date"
              showTime
              :showIcon="true"
              iconDisplay="input"
              placeholder="Select Arrival Date"
              variant="filled"
              fluid
            />
            <Message
              v-if="$form.arrival_date?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $form.arrival_date.error?.message }}
            </Message>
          </div>
          <div class="flex flex-col gap-1">
            <label for="departure_date" class="block font-semibold mb-1">Departure Date</label>
            <DatePicker
              inputId="departure_date"
              name="departure_date"
              showTime
              :showIcon="true"
              iconDisplay="input"
              placeholder="Select Departure Date"
              variant="filled"
              fluid
            />
          </div>
        </div>
        <div class="flex justify-end">
          <Button type="submit" severity="primary" label="Save" class="mt-5" />
        </div>
      </Form>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { createRecordApi } from '@src/api/endpoints';
import { useAgenciesfilter } from '@src/filters/agencies';
import { DatePicker, Card, Button, Divider, Select, InputText, Message } from 'primevue';
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';

const router = useRouter();
const { agencies, getAgencies } = useAgenciesfilter();
const formValues = ref({});

const resolver = ref(
  zodResolver(
    z.object({
      agency_id: z.number({ required_error: 'Agency is required!' }),
      booking_no: z.string({ required_error: 'Booking No is required!' })
      // group_head: z.string().optional(),
      // arrival_date: z.date({ message: 'Arrival date' }),
      // departure_date: z.date().optional()
    })
  )
);

const onFormSubmit = (e: FormSubmitEvent) => {
  if (e.valid) {
    createRecordApi('/bookings', e.values).then((res: any) => {
      window.toast('success', 'Booking Information', res.message);
      router.push({ name: 'booking_list' });
    });
  } else {
    console.log(e);
    e.reset();
  }
};

const handleCancel = () => {
  router.push({ name: 'booking_list' });
};

onMounted(() => {
  getAgencies();
});
</script>

<style lang="scss" scoped></style>
