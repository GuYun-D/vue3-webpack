// import 'css-loader!../css/style.css'
import '../css/style.css'
import '../css/banner.less'

const divEl = document.createElement("div")
const banner = document.createElement("div")

divEl.className = "title"
banner.className = "banner"

divEl.innerText = "你好 vue3"
banner.innerText = "我是一个banner"

document.body.appendChild(divEl)
document.body.appendChild(banner)