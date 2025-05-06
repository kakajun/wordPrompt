import App from './App.vue'
import { createSSRApp } from 'vue'
import uView from '/uni_modules/vk-uview-ui'
import * as Pinia from 'pinia'
import i18n from '/locales'

export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia.createPinia())
  app.use(i18n)
  // 使用 uView UI
  app.use(uView)
  return {
    app,
    Pinia
  }
}
