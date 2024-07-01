<template>
  <table class="table">
    <thead class="head">
      <tr>
        <th class="th">Name</th>
        <th class="th">Status</th>
        <th class="th">Created At</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="list.length === 0">
        <td colspan="11" class="data_placeholder">Record Not Exist</td>
      </tr>
      <tr v-for="item in list" :key="item.id">
        <td class="td">{{ item.name }}</td>
        <td class="td">
          <n-tag :bordered="false" :type="item.status === 'disabled' ? 'error' : 'success'">
            {{ item.status }}
          </n-tag>
        </td>
        <td class="td">{{ item.created_at }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  bedsData: Record<string, any>;
}>();

const list: any = ref(props.bedsData);
</script>

<style lang="scss" scoped>
.table {
  @apply w-full text-sm text-left text-gray-500 dark:text-gray-400;
}
.head {
  @apply sticky top-0 text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 z-20;
}
.th {
  @apply px-6 py-3 border  border-gray-200 dark:border-gray-800 text-center whitespace-nowrap;
}
.body_tr {
  @apply hover:bg-gray-50 dark:hover:bg-gray-600;
}
.td {
  @apply px-3 py-3 border border-gray-200 dark:border-gray-800 whitespace-nowrap;
}

.data_placeholder {
  text-align: center;
  color: gray;
  padding: 20px 0;
  font-size: 18px;
  font-style: italic;
}
</style>
