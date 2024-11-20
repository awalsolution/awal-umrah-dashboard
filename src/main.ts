import '@src/assets/styles/main.scss';

import { createApp } from 'vue';
import App from '@src/App.vue';
import { faviconLoader } from '@src/constants/faviconLoader';
import { setupDirectives } from '@src/directives/directives';
import { setupStore } from '@src/store';
import { setupRouter } from '@src/router';

//
import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import StyleClass from 'primevue/styleclass';
import FocusTrap from 'primevue/focustrap';
import Tooltip from 'primevue/tooltip';
import Ripple from 'primevue/ripple';

const app = createApp(App);

faviconLoader();

setupStore(app);
//
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.app-dark'
    }
  }
});
app.use(ToastService);
app.use(ConfirmationService);
app.directive('styleclass', StyleClass);
app.directive('focustrap', FocusTrap);
app.directive('tooltip', Tooltip);
app.directive('ripple', Ripple);
//
setupDirectives(app).then(() => {});

setupRouter(app);

app.mount('#app');
