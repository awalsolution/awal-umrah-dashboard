<template>
  <div>
    <n-card title="Edit User of Organization">
      <n-form ref="formRef" :label-width="80" :model="formValue" :rules="formRules" size="small">
        <n-row :gutter="[20, 8]">
          <n-col :span="8">
            <n-form-item label="Email" path="email">
              <n-input v-model:value="formValue.email" placeholder="Enter Email" />
            </n-form-item>
          </n-col>
          <n-col :span="8">
            <n-form-item label="User Role" path="role_id">
              <n-select
                :filterable="true"
                multiple
                :tag="false"
                placeholder="Select Role"
                v-model:value="formValue.roles"
                clearable
                @focus="getRolesOnFocus(route.params.db_name)"
                :remote="true"
                :clear-filter-after-select="false"
                label-field="name"
                value-field="id"
                :loading="roleLoading"
                :options="roles"
              />
            </n-form-item>
          </n-col>
          <n-col :span="8">
            <n-form-item label="status" path="status">
              <n-switch v-model:value="formValue.status" :checked-value="1" :unchecked-value="0" />
            </n-form-item>
          </n-col>
        </n-row>
        <n-space justify="end">
          <n-form-item :theme-overrides="{ labelHeightSmall: '0', feedbackHeightSmall: '0' }">
            <n-button secondary type="info" @click="handleValidateClick"> Save </n-button>
          </n-form-item>
        </n-space>
      </n-form>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { type FormInst } from 'naive-ui';
import { getRecordApi, updateRecordApi } from '@src/api/endpoints';
import { useTenantRolefilter } from '@src/filters/tenantRole';
import { formRules } from '@src/rules/user';
import { useRoute, useRouter } from 'vue-router';

const { roles, roleLoading, getRoles, getRolesOnFocus } = useTenantRolefilter();
const formRef = ref<FormInst | null>(null);
const formValue: Ref = ref({});

const route = useRoute();
const router = useRouter();

// fetch single user using id
getRecordApi(`/tenant/find-user-of-tenant`, {
  db_name: route.params.db_name,
  user_id: route.params.user_id
}).then((res: any) => {
  getRoles(route.params.db_name);
  formValue.value = res.data;
  formValue.value.roles = formValue.value.roles.map((v: any) => v.id);
});

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      updateRecordApi(`/tenant/edit-user-of-tenant/${route.params.user_id}`, {
        ...formValue.value,
        db_name: route.params.db_name
      }).then((res: any) => {
        window['$message'].success(res.message);
        router.push({
          name: 'organization_details'
        });
      });
    } else {
      console.log(errors);
      window['$message'].error('Invalid');
    }
  });
};
</script>

<style lang="scss" scoped></style>
