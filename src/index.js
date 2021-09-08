import { sum } from './js/math'
const { priceFormmat } = require('./js/foemat')
import './js/element'
import './js/es'

import { createApp } from 'vue/dist/vue.esm-bundler'
import App from './components/App.vue'

console.log(sum(12, 46));
console.log(priceFormmat());

const app = createApp(App)

app.mount("#app")