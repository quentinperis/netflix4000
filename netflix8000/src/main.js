import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueRecaptchaPlugin } from 'vue-recaptcha/head'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueRecaptchaPlugin, {
  v2SiteKey: '6LdthOQpAAAAAOzdxJnMmX1aYXzHfkAzgzYh05VY',
})

app.mount('#app')
