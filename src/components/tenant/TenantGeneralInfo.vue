<template>
  <Card>
    <template #content>
      <Divider
        align="center"
        type="dotted"
        :dt="{ root: { borderColor: '{primary.color}' }, horizontal: { margin: '0 0 2rem 0' } }"
      >
        <b class="text-xl">Organization Information</b>
      </Divider>
      <div class="grid grid-cols-3 gap-5">
        <div class="w-full">
          <label for="tenant_name" class="block font-semibold mb-1">Name</label>
          <InputText
            id="tenant_name"
            v-model="data.tenant_name"
            fluid
            autocomplete="off"
            placeholder="Name"
          />
        </div>
        <div class="w-full">
          <label for="domain_name" class="block font-semibold mb-1">Domain Name</label>
          <InputText
            id="domain_name"
            v-model.trim="data.domain_name"
            :required="true"
            :invalid="submitted && !data.domain_name"
            fluid
            placeholder="Domain Name"
          />
          <small v-if="submitted && !data.domain_name" class="text-red-500"
            >Domain Name is required.</small
          >
        </div>
        <div class="w-full">
          <label for="email" class="block font-semibold mb-1">Email</label>
          <InputText
            id="email"
            v-model.trim="data.email"
            :required="true"
            :invalid="submitted && !data.email"
            fluid
            placeholder="Email"
          />
          <small v-if="submitted && !data.email" class="text-red-500">Email is required.</small>
        </div>
        <div class="w-full">
          <label for="phone_number" class="block font-semibold mb-1">Phone#</label>
          <InputText
            id="phone_number"
            v-model="data.phone_number"
            fluid
            autocomplete="off"
            placeholder="Phone#"
          />
        </div>
        <!-- <div class="w-full">
          <label for="plan_id" class="block font-semibold mb-1">Plan</label>
          <Select
            id="plan_id"
            v-model="data.plan_id"
            :options="plans"
            option-label="name"
            option-value="id"
            placeholder="Select Plan"
            class="w-full"
          />
        </div> -->
      </div>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-3 justify-end">
        <Button label="Cancel" severity="danger" @click="handleCancel" />
        <Button label="Save" @click="saveForm" />
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { updateRecordApi } from '@src/api/endpoints';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Divider from 'primevue/divider';
import Button from 'primevue/button';
// import Select from 'primevue/select';
// import { usePlanfilter } from '@src/filters/plan';

const props = defineProps<{ tenantData: any }>();

const router = useRouter();
// const { plans, getPlans } = usePlanfilter();
const data: Ref = ref({});
const submitted: Ref = ref(false);

const saveForm = () => {
  submitted.value = true;
  if (data?.value.domain_name?.trim() && data?.value.email?.trim()) {
    updateRecordApi(`/tenants/edit-single-tenant/${data.value.id}`, data.value).then((res: any) => {
      window.toast('success', 'Organization Information', res.message);
      router.push({ name: 'organization_list' });
    });
    data.value = {};
  }
};

const handleCancel = () => {
  router.push({ name: 'organization_list' });
};

onMounted(() => {
  // getPlans();
  data.value = props.tenantData;
  data.value.plan_id = props.tenantData.plan.id;
});
</script>

<style lang="scss" scoped></style>
