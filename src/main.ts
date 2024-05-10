import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/index.css'
import { Table, Select, Tag } from 'ant-design-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)

app.use(Table)
app.use(Select)
app.use(Tag)

app.use(router)

app.mount('#app')
