// import 'css-loader!../css/style.css'
import '../css/style.css'
import '../css/banner.less'

const divEl = document.createElement("div")
const banner = document.createElement("div")
const bgDiv = document.createElement("div")

divEl.className = "title"
banner.className = "banner"
bgDiv.className = "img-bg"

divEl.innerText = "你好 vue3"
banner.innerText = "我是一个banner"

document.body.appendChild(divEl)
document.body.appendChild(banner)
document.body.appendChild(bgDiv)