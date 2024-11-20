<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in menuList" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useAsyncRouteStore } from '@src/store/modules/asyncRoute';
import { generatorMenu } from '@src/utils/router/sidebarGenerator';
import AppMenuItem from './AppMenuItem.vue';

const asyncRouteStore = useAsyncRouteStore();
const menuList: Ref = ref([]);

function updateMenu() {
  menuList.value = generatorMenu(asyncRouteStore.getMenus);
}

onMounted(() => {
  updateMenu();
});
</script>

<style lang="scss" scoped></style>
