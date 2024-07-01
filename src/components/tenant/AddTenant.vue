<template>
  <div>
    <n-card title="Add New Organization">
      <n-form ref="formRef" :label-width="80" :model="formValue" :rules="formRules" size="small">
        <n-row :gutter="20">
          <n-space :verical="true" item-class="w-full">
            <n-card title="Organization Info">
              <n-col :span="8">
                <n-form-item label="Plan Price" path="plan_id">
                  <n-select
                    :filterable="true"
                    :tag="false"
                    placeholder="Select Plan"
                    v-model:value="formValue.plan_id"
                    clearable
                    @focus="getPlansOnFocus"
                    :remote="true"
                    :clear-filter-after-select="false"
                    label-field="name"
                    value-field="id"
                    :loading="planLoading"
                    :options="plans"
                  />
                </n-form-item>
              </n-col>
              <n-col :span="8">
                <n-form-item label="Organization Name" path="tenant_name">
                  <n-input v-model:value="formValue.tenant_name" placeholder="Enter  Name" />
                </n-form-item>
              </n-col>
              <n-col :span="8">
                <n-form-item label="Domain Name" path="domain_name">
                  <n-input v-model:value="formValue.domain_name" placeholder="Enter Domain Name" />
                </n-form-item>
              </n-col>
              <n-col :span="8">
                <n-form-item label="status" path="status">
                  <n-switch
                    v-model:value="formValue.status"
                    :checked-value="1"
                    :unchecked-value="0"
                  />
                </n-form-item>
              </n-col>
            </n-card>

            <n-card title="Organization Admin User Info">
              <n-col :span="8">
                <n-form-item label="Email" path="email">
                  <n-input v-model:value="formValue.email" placeholder="Enter Email" type="email" />
                </n-form-item>
              </n-col>
              <n-col :span="8">
                <n-form-item label="Password" path="password">
                  <n-input
                    v-model:value="formValue.password"
                    placeholder="Enter Password"
                    type="password"
                    showPasswordOn="click"
                  />
                </n-form-item>
              </n-col>
              <n-col :span="8">
                <n-form-item label="Password Confirm" path="password_confirmation">
                  <n-input
                    v-model:value="formValue.password_confirmation"
                    placeholder="Enter Password"
                    type="password"
                    showPasswordOn="click"
                  />
                </n-form-item>
              </n-col>
              <n-col :span="8">
                <n-form-item label="First Name" path="first_name">
                  <n-input v-model:value="formValue.first_name" placeholder="Enter First Name" />
                </n-form-item>
              </n-col>
              <n-col :span="8">
                <n-form-item label="Last Name" path="last_name">
                  <n-input v-model:value="formValue.last_name" placeholder="Enter Last Name" />
                </n-form-item>
              </n-col>
              <n-col :span="8">
                <n-form-item label="Phone Number" path="phone_number">
                  <n-input
                    v-model:value="formValue.phone_number"
                    placeholder="Enter Phone Number"
                  />
                </n-form-item>
              </n-col>
              <n-col :span="8">
                <n-form-item label="Address" path="address">
                  <n-input v-model:value="formValue.address" placeholder="Enter Address" />
                </n-form-item>
              </n-col>
              <n-col :span="8">
                <n-form-item label="City" path="city">
                  <n-input v-model:value="formValue.city" placeholder="Enter city" />
                </n-form-item>
              </n-col>
              <n-col :span="8">
                <n-form-item label="State" path="state">
                  <n-input v-model:value="formValue.state" placeholder="Enter State" />
                </n-form-item>
              </n-col>
              <n-col :span="8">
                <n-form-item label="Country" path="country">
                  <n-input v-model:value="formValue.country" placeholder="Enter Country" />
                </n-form-item>
              </n-col>
            </n-card>

            <n-card title="Insert Organization Roles">
              <n-checkbox-group v-model:value="formValue.roles">
                <n-row>
                  <n-col v-for="role of roles" :key="role.id" :span="6">
                    <n-checkbox :value="role.name" :label="role.name" />
                  </n-col>
                </n-row>
              </n-checkbox-group>
            </n-card>

            <n-card title="Insert Organization Permissions">
              <n-checkbox-group class="mx-2" v-model:value="formValue.permissions">
                <n-row>
                  <n-col v-for="permission of permissions" :key="permission.id" :span="6">
                    <n-checkbox :value="permission.name" :label="permission.name" class="mb-2" />
                    <n-tag size="small" :type="permission.type === 'private' ? 'error' : 'success'">
                      {{ permission.type }}
                    </n-tag>
                  </n-col>
                </n-row>
              </n-checkbox-group>
            </n-card>
          </n-space>
        </n-row>

        <n-space justify="end" class="mt-5">
          <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
            <n-button secondary type="info" @click="handleValidateClick"> Save </n-button>
          </n-form-item>
        </n-space>
      </n-form>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { type FormInst } from 'naive-ui';
import { createRecordApi } from '@src/api/endpoints';
import { usePlanfilter } from '@src/filters/plan';
import { useRolefilter } from '@src/filters/role';
import { usePermissionfilter } from '@src/filters/permission';
import { formRules } from '@src/rules/tenant';

const router = useRouter();
const formRef = ref<FormInst | null>(null);
const { plans, planLoading, getPlansOnFocus } = usePlanfilter();
const { permissions, getPermissions } = usePermissionfilter();
const { roles, getRoles } = useRolefilter();

const formValue: Ref = ref({
  permissions: [],
  roles: []
});

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      createRecordApi('/tenant', formValue.value).then((res: any) => {
        window['$message'].success(res.message);
        router.push({
          name: 'organization_list'
        });
      });
    } else {
      console.log(errors);
      window['$message'].error('Please fill out required fields');
    }
  });
};

onMounted(() => {
  getRoles();
  getPermissions();
});
</script>

<style lang="scss" scoped></style>
