// import 'css-loader!../css/style.css'
import '../css/style.css'

const divEl = document.createElement("div")

divEl.className = "title"

divEl.innerText = "你好 vue3"

document.body.appendChild(divEl)