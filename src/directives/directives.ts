import type { App } from 'vue';

import { permission } from '@src/directives/permission';

export async function setupDirectives(app: App) {
  // permission control command v-permission="{ action: ['any permission name'] }"
  app.directive('permission', permission);
}
