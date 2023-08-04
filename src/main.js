import {createApp} from 'vue'
import '../src/assets/main.css'
import App from './App.vue'
import router from './router'
// import vuetify from './plugins/vuetify'
// import Vue3EasyDataTable from 'vue3-easy-data-table';
// import 'vue3-easy-data-table/dist/style.css';

// import VueGoodTablePlugin from 'vue-good-table';

// import the styles
// import 'vue-good-table/dist/vue-good-table.css'


const app = createApp(App)

// app.use(Vue3EasyDataTable)

app
    .use(router)
    // .use(VueGoodTablePlugin)
    // .use(vuetify)
    .mount('#app')
