import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import $ from 'jquery'

import { library } from '@fortawesome/fontawesome-svg-core'
// import { toast } from 'vue3-toastify';
// import 'vue3-toastify/dist/index.css'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import ToastPlugin from 'vue-toast-notification';
// import 'vue-toast-notification/dist/theme-bootstrap.css';



// import SchedulePlugin from '@syncfusion/ej2-vue-schedule';
import { SchedulePlugin, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-vue-schedule';
const pinia = createPinia();
const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(app)
app.use($)
app.use(SchedulePlugin)
app.use(pinia)
app.use(router)
    // app.use(toast);
app.mount('#app')