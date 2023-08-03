import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import '../src/assets/main.css'


createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')

// let userData = JSON.parse(localStorage.getItem('userData'))
// if(userData){
//     router.push("/");
//
// }else {
//     router.push("/");
//
// }