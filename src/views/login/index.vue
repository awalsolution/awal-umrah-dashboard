<template>
  <div class="login_container flex items-center justify-center h-full">
    <n-form ref="formRef" label-placement="left" size="large" :model="formData" :rules="formRules">
      <n-form-item path="email">
        <n-input v-model:value="formData.email" placeholder="Enter Email">
          <template #prefix>
            <n-icon size="18" color="#808695">
              <PersonOutline />
            </n-icon>
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="password">
        <n-input
          v-model:value="formData.password"
          type="password"
          showPasswordOn="click"
          placeholder="Enter Password"
        >
          <template #prefix>
            <n-icon size="18" color="#808695">
              <LockClosedOutline />
            </n-icon>
          </template>
        </n-input>
      </n-form-item>
      <n-form-item>
        <n-button
          type="primary"
          @click="handleSubmit"
          size="large"
          :loading="loading"
          block
          :disabled="loginButton"
        >
          Login
        </n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeMount, reactive, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { type FormValidationError } from 'naive-ui';
import { PersonOutline, LockClosedOutline } from '@vicons/ionicons5';
import { useUserStore } from '@src/store/modules/user';
import { AuthUtils } from '@src/utils/auth';
import { useLoading } from '@src/hooks/useLoading';
import type { RememberedAccountData } from '@src/views/login/types';
import { useEnv } from '@src/hooks/useEnv';
import { verifyDomainNameApi } from '@src/api/auth';
import { TENANT_API_KEY } from '@src/utils/storage/variables';
import { storage } from '@src/utils/storage';
import { formRules } from '@src/rules/login';

const formRef = ref();
const rememberPassword = ref(false);
const loginButton = ref(false);
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const [loading, loadingDispatcher] = useLoading(false);
const { centralDomain } = useEnv();
const isHost = window.location.hostname;
const tenantApiKey = storage.getTenantApiKey(TENANT_API_KEY);

const formData = reactive({
  email: 'iqbal@gmail.com',
  password: '123456'
});

const redirectUrl = computed(() => route.query.redirect as string);

console.log('tenant api key ==>', tenantApiKey);

const isLoginButtonDisabled = () => {
  loginButton.value = !(
    window.location.hostname === centralDomain ||
    (storage.getTenantApiKey(TENANT_API_KEY) !== 'null' &&
      storage.getTenantApiKey(TENANT_API_KEY) !== null)
  );
};
``;

const handleSubmit = async () => {
  try {
    await formRef.value!.validate();
  } catch (errors) {
    const errorMessage = (errors as FormValidationError[])[0][0].message;
    if (errorMessage) {
      window['$message'].error(errorMessage);
    }
    return;
  }

  if (loading.value) {
    return;
  }

  loadingDispatcher.start();

  userStore
    .login(formData)
    .then((res: any) => {
      console.log(res);
      loadingDispatcher.end();
      if (res.message) {
        window['$message'].success(res.message);
      }
      if (rememberPassword.value) {
        AuthUtils.setRememberedAccount(JSON.stringify(formData));
      } else {
        AuthUtils.clearRememberedAccount();
      }

      if (redirectUrl.value) {
        router.replace(redirectUrl.value);
      } else {
        router.replace('/');
      }
    })
    .catch((err: any) => {
      console.log(err);
      if (err.message) {
        window['$message'].error(err.message);
      }
      loadingDispatcher.end();
      formData.password = '';
    });
};

onMounted(() => {
  const localStorageData = AuthUtils.getRememberedAccount();
  if (localStorageData) {
    try {
      const { email, password } = JSON.parse(localStorageData) as RememberedAccountData;
      formData.email = email;
      formData.password = password;
      rememberPassword.value = true;
    } catch {
      window['$message'].error('Some thing went wrong try again');
    }
  }
});

const verifyDomainName = async () => {
  if (isHost !== centralDomain) {
    verifyDomainNameApi(isHost).then((res: any) => {
      if (res?.code === 200) {
        const ex = 7 * 24 * 60 * 60;
        storage.set(TENANT_API_KEY, res?.data.tenant_api_key, ex);
      }
      isLoginButtonDisabled();
    });
  } else {
    storage.remove(TENANT_API_KEY);
  }
};

onBeforeMount(() => verifyDomainName());
</script>

<style lang="scss" scoped>
@media (min-width: 768px) {
  .login_container {
    background-image: url('../../assets/images/auth/login.svg');
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
  }
}
</style>
