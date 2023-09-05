import '@src/assets/styles/main.scss';
import 'nprogress/nprogress.css';

import { createApp } from 'vue';
import App from '@src/App.vue';
import { faviconLoader } from '@src/constants/faviconLoader';
import { naiveUILoader } from '@src/constants/naiveUILoader';
import { setupStore } from '@src/store';
import { setupRouter } from '@src/router';
import { setupNaive, setupDirectives } from '@src/plugins';

const app = createApp(App);

faviconLoader();
naiveUILoader();

setupNaive(app);

setupStore(app);

setupDirectives(app);

setupRouter(app);

app.mount('#app');