import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import Test from './components/Test.vue'

const app = createApp(App)


app.use(router)

app.mount('#app')
