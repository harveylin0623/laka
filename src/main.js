import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import router from './router'
import i18n from './plugins/i18n'
import './assets/css/tailwind.css'
import App from './App.vue'
import { directiveCurrency } from './directives/currency.js'
import { directiveFocus } from './directives/focus.js'
import { directiveVisible } from './directives/visible.js'
import '@/assets/scss/elementPlus/index.scss'
import '@/plugins/vee-validate.js'

const app = createApp(App)
const pinia = createPinia()
const head = createHead()

pinia.use(piniaPluginPersistedstate)
app.config.devtools = import.meta.env.DEV
app.directive('currency', directiveCurrency)
app.directive('focus', directiveFocus)
app.directive('visible', directiveVisible)
app.use(i18n)
app.use(router)
app.use(pinia)
app.use(head)
app.use(VueDOMPurifyHTML)
app.mount('#app')