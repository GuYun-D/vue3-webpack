// import 'css-loader!../css/style.css'
import '../css/style.css'
import '../css/banner.less'
// import imgMy from '../images/12.jpg'

const divEl = document.createElement("div")
const banner = document.createElement("div")
const bgDiv = document.createElement("div")
// const imgEl = document.createElement("img")

divEl.className = "title"
banner.className = "banner"
// bgDiv.className = "img-bg"

// 这个路径是相对于index.html而言的，所以它就找不到对应的图片，所以要使用url-loader来进行处理
imgEl.src = imgMy;

divEl.innerText = "你好 vue3"
banner.innerText = "我是一个banner"

document.body.appendChild(divEl)
document.body.appendChild(banner)
document.body.appendChild(bgDiv)
// document.body.appendChild(imgEl)