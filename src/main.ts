import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/index.css'
import { Table, Select } from 'ant-design-vue'

const app = createApp(App)

app.use(Table)
app.use(Select)
app.use(router)

app.mount('#app')
