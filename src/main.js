import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import router from './router'
import api from './api/index'
import { state } from './store'
import { plugin, defaultConfig } from '@formkit/vue'


const app = createApp(App)
.use(router)
.use(plugin, defaultConfig)
.provide('api', api)
.provide('state', state)
.mount('#app')

