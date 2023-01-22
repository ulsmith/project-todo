import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createApp } from "vue";
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App);
const vuetify = createVuetify({
	components,
	directives,
	icons: {
			defaultSet: 'mdi',
			aliases,
			sets: {
				mdi,
			}
		},
	}
);

app.use(vuetify);
app.use(createPinia());
app.use(router);

app.mount("#app");
