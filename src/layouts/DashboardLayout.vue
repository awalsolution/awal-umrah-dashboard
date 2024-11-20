<template>
  <div class="layout-wrapper" :class="containerClass">
    <app-topbar></app-topbar>
    <app-sidebar></app-sidebar>
    <div class="layout-main-container">
      <div class="layout-main">
        <router-view> </router-view>
      </div>
      <app-footer></app-footer>
    </div>
    <div class="layout-mask animate-fadein"></div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { computed, ref, watch } from 'vue';
import AppFooter from '@src/layouts/components/AppFooter.vue';
import AppSidebar from '@src/layouts/components/AppSidebar.vue';
import AppTopbar from '@src/layouts/components/AppTopbar.vue';
import { useLayout } from '@src/layouts/components/composables/layout';
import { useUserStore } from '@src/store/modules/user';
import { ACCESS_TOKEN } from '@src/utils/storage/variables';
import { storage } from '@src/utils/storage';

const loading = ref(true);
const userStore = useUserStore();
const router = useRouter();
const outsideClickListener: any = ref(null);
const { layoutConfig, layoutState, isSidebarActive, resetMenu } = useLayout();

const checkLogin = async () => {
  if (storage.isAuthenticated(ACCESS_TOKEN)) {
    if (!userStore.hasData()) {
      await userStore.getCurrentUserWithApiRequest();
      window.toast('success', 'Success Message', 'Current User Authenticated Successfully!');
    }
    loading.value = false;
  } else {
    userStore.logout();
    router.replace({
      path: '/login'
    });
    loading.value = false;
  }
  loading.value = false;
};

onBeforeMount(() => checkLogin());

watch(isSidebarActive, (newVal) => {
  if (newVal) {
    bindOutsideClickListener();
  } else {
    unbindOutsideClickListener();
  }
});

const containerClass = computed(() => {
  return {
    'layout-overlay': layoutConfig.menuMode === 'overlay',
    'layout-static': layoutConfig.menuMode === 'static',
    'layout-static-inactive':
      layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
    'layout-overlay-active': layoutState.overlayMenuActive,
    'layout-mobile-active': layoutState.staticMenuMobileActive
  };
});

function bindOutsideClickListener() {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event: Event) => {
      if (isOutsideClicked(event)) {
        resetMenu();
      }
    };
    document.addEventListener('click', outsideClickListener.value);
  }
}

function unbindOutsideClickListener() {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener);
    outsideClickListener.value = null;
  }
}

function isOutsideClicked(event: any) {
  const sidebarEl: any = document.querySelector('.layout-sidebar');
  const topbarEl: any = document.querySelector('.layout-menu-button');

  return !(
    sidebarEl?.isSameNode(event.target) ||
    sidebarEl.contains(event.target) ||
    topbarEl.isSameNode(event.target) ||
    topbarEl.contains(event.target)
  );
}
</script>

<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
