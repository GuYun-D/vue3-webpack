import { sum } from './js/math'
const { priceFormmat } = require('./js/foemat')
import './js/element'
import './js/es'

if (module.hot) {
  module.hot.accept("./js/element.js", () => {
    console.log("element模块发生了更新");
  })
}

import { createApp } from 'vue'
import App from './components/App.vue'

console.log(sum(12, 46));
console.log(priceFormmat());

const app = createApp(App)

app.mount("#app")