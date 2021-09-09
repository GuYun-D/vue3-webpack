# Webpack的安装

<mark>先全局安装(当然也可以局部安装)</mark>

```js
  npm i webpack webpack-cli -g
```

## webpack webpack-cli的关系
- 执行webpack命令，会执行node_module下的bin目录下的webpack
- webpack在执行时是依赖webpack-cli的，而webpack-cli执行时，才是真正利用webpack进行编译和打包
- 一般框架的脚手架里面并没有webpack-cli，如vue-cli，他有类似于自己的vue-server-cli的东西

# 执行webpack
- <mark>在文件根目录下，打开命令行，执行webpack命令，回车</mark>
执行完毕之后，项目目录就会生成一个dist目录，里面就是已经打包好的文件：main.js

- 为了防止webpack版本不同导致其他包依赖低版本的webpack时，采用局部安装，先生成package.json文件：根目录下命令行执行npm init -y
  ```js
  npm i webpack webpack-cli -D
  ```

  - 安装成功之后，package.json就会记录刚刚下载的包的信息
  
  ```js
    ...
    "devDependencies": {
      "webpack": "^5.52.0",
      "webpack-cli": "^4.8.0"
    }
  ```

- 执行局部的webpack
  **在命令行中直接执行webpack命令时，优先执行的是全局的webpack**
  局部的webpack存在于项目中的node_modeules中的.bin目录里面，所以执行局部的webpack方法是：
  - .\node_modules\.bin\webpack
  如果在cmd中运行，必须是"\",如果在如vscode内置的终端运行，可以写成"/"或者"\"
  - npx webpack (简单易记)
  - 添加脚本，在package.json中的script中添加一个脚本
  ```js
    "scripts": {
      "build": "webpack"
    },
  ```
  在生成package.json的时候，自动生成了一个test的脚本，一般不用，删除即可，添加build脚本之后，不用写npx，脚本在执行的时候自动会去node_modules中去找
  在命令行只需要执行一下npm run build命令就ok可
  ```js
    npm run build
  ```

# Webpack配置文件
以上三种打包文件的方法都是默认以当前文件下的src目录下的index.js为打包的入口
- 自定义打包的入口和出口
  cmd:
  ```js
    npx webpack --entery .\src\main.js --output-path .\build
  ```

  package.json：
  ```js
    "scripts": {
      "build": "webpack --entery .\src\main.js --output-path .\build"
    },
  ```

- 最常用以及最灵活的方式：添加webpack的配置文件
  **根目录下**创建一个名为webpack.config.js的文件，该文件是运行在node环境的，所以要使用CommentJS规范，详情见webpack.config.js的文件

  ```js
    const path = require('path')
    module.exports = {
      // 配置打包入口
      entry: './src/index.js',

      // 配置打包出口
      output: {
        // 文件夹名称，要求必须是绝对路径
        path: path.resolve(__dirname, './build'),
        // 打包后生成的文件名
        filename: "build.js"
      }
    }
  ```

  然后在命令行中执行npm run build，webpack会自动读取配置文件
<br/>
  > 当然我们也可以不把名字叫做webpack.config.js,也可以叫做是其他的，如xxxx.config.js
  这样的话就要修改脚本配置了：

  ```js
    ...
    "scripts": {
      "build": "webpack --config xxxxx.config.js"
    },
    ....
  ```


# 打包css
## 安装css-loader
```js
npm i css-loader
```

## 使用css-loader
- 内联
  ```js
    import 'css-loader!../css/style.css'
  ```
- cli（webpack5不再使用）
- 配置
  ```js
    // 配置loader
    module: {
      rules: [
        {
          test: /\.css$/,
          // loader: "css-loader"
          // 完整写法
          // use: [
          //   {
          //     loader: "css-loader",
          //     option: {}
          //   }
          // ]
          use: ["css-loader"]
        }
      ]
    }
  ```

## style-loader
css-loader只负责将css进行打包，但是并没有将打包好的css插入到html中
```js
  use: ["style-loader","css-loader"]
```

**loader执行是有顺序的，从下到上，从右向左**

## less-loader
- 安装依赖
  ```js
    npm i less less-loader -D
  ```

- 配置
  ```js
  {
    test: /\.less$/,
    use: ["style-loader", "css-loader", "less-loader"]
  }
  ```

## postcss
- 什么是postcss
  - 一个通过js来转换样式的工具
  - 进行一些css的转换和适配，比如自动添加浏览器前缀，css样式的重置
- 使用postcss
  查找postcss在构建工具中的扩展，如postcss-loader
- 安装
  ```js
    npm i postcss postcss-loader autoprefixer -D
  ```
- 使用
  ```js
    ...
    use: ["style-loader", "css-loader", {
      loader: "postcss-loader", options: {
        postcssOptions: {
          plugins: [require("autoprefixer")]
        }
      }
    }]
    ...
  ```
- 将postcss配置抽取到postcss.config.js文件中
- postcss-preset-env
  - 帮助我们将一些现代的css特性，转换成大多数浏览器认识的css，并且会根据目标浏览器或者运行时环境添加所需要的poilfill
  - 其内部也相当于是内置了autoprefixer

## 合并css和less的处理
```js
  {
    test: /\.(less|css)$/,
    use: [
      "style-loader",
      "css-loader",
      "postcss-loader",
      "less-loader"
    ]
  }
  ```

## 其他资源的打包

**file-loader**
- 作背景图的图片直接使用该loader
- 作为img的src的资源的就要将该图片通过import的方法导入进来

**url-loader**
- 和file-loader的工作方式是一样的，但是可以将较小的文件转成base64的url
- 安装：npm i url-loader -D

# 文件命名规则
保留原来的文件名，扩展名，同时为了防止重复，包含一个hash值
使用placeholder就可以完成
- [ext]：处理文件的扩展名
- [name]: 处理文件的名称
- [hash]: 文件的内容，使用MD4的散列函数生成，生成一个128位的hash值（32个十六进制）
- [contenthash]: 在file-loader中和[hash]结果是一致的
- [hash:<length>]:截图hash的长度，，默认32位太长
- [path]:文件相对于webpack配置文件的路径

https://webpack.docschina.org/loaders/

# asset module type
webpack5之前加载资源都是使用loader，5之后就可以直接使用资源模块类型来代替上面的loader

## 模块类型
- asset/resource:发送一个单独的文件并导出url，（file-loader的功能）
- asset/inline: 导出一个资源的data url（即url-loader的功能）
- asset/source:导出资源的源代码，（raw-loader的功能）
- asset:在导出一个data url和发送一个单独的文件之间自动选择

## 字体文件打包


# 插件的使用

## 自动删除已经打包好的build文件：cleanWebpackPlugin

- 安装
  ```js
    npm i clean-webpack-plugin -D
  ```
- 使用
  ```js
  const {CleanWebpackPlugin}  = require('clean-webpack-plugin')

  module.exports = {
    ...
    plugins: [
      new CleanWebpackPlugin()
    ]
    ...
  }
  ```

## 配置html模板：HtmlWebpackPlugin
**根目录中的index.html就可以不要了**
```js
  npm i html-webpack-plugin -D
```

- 使用
```js
const HtmlWebpackPluign = require('html-webpack-plugin')

module.exports = {
  ...
  plugins: [
    // 直接这样，插件会使用自己的html模板，不符合vue的使用，所以我们要自定义一个模板
    // new HtmlWebpackPluign()
    new HtmlWebpackPluign({
      template: "./public/index.html",
      title: "我是htmlWebpackPlugin配置的title"
    })
  ]
  ...
}
```

## 添加常量:DefinePlugin
DefinePlugin是webpack内置的插件，允许在编译的时候创建一个配置的全局常量

```js
const {DefinePlugin} = require('webpack')

...
new DefinePlugin({
  BASE_URL: "'./'"
})
...
```

上面俩的html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= htmlWebpackPlugin.options.title %></title>
  <link rel="icon" href="<%= BASE_URL %>favicon.icon">
</head>
<body>
  <noscript>
    <strong>
      we'are sorry but <%= htmlWebpackPlugin.options.title %> doesn't work
      properly widthout JavaScript enabled. Please enable it to continue
    </strong>
  </noscript>
  <div id="app"></div>
</body>
</html>
```

# 将项目public中的文件复制到build中
**copyWebpackPlugin**
- 安装
  ```js
    npm i copy-webpack-plugin -D
  ```
- 使用
  ```js
  new CopyWebpackPlugin({
    // 匹配规则集
    patterns: [
      {
        // 从哪复制
        from: "public",
        // 复制到哪，to不写，插件可以读取上下文信息
        to: "./",
        // 全局配置
        globOptions: {
          // 忽略复制规则
          ignore: [
            // 忽略所有的index.html文件
            "**/index.html"
          ]
        }
      }
    ]
  })
  ```

# mode的配置
- development 打包后的bundle.js是以eavl函数包裹的
- production 打包后就一行

# devtool
- source-map建立与js的映射，方便浏览器调试程序

# babel
- babel是一个工具链，主要用于旧浏览器或者环境中将es6以上的代码转换成兼容旧版本的js
- 包括语法转化，源代码转化
- babel也可以独立使用
- 工具
  - @babel/core 
  - 预设：@babel/preset-env,通过使用预设对语法进行转换，否则就要一个一个下载对应的语法插件
  - babel-loader
- babel配置文件
  - babel.config.js
  - .babelrc.json:早期使用的方式，配置起来比较麻烦

# vue单文件打包

## vue打包之后不同版本
- vue(.runtime).global(.prod).js
  - 通过浏览器中的script直接使用
  - 通过cdn引入的
  - 会暴漏一个全局的Vue
  - .prod就是代码经过丑化的
- vue(.runtime).esm-browser(.prod).js
  - 通过原生es模块导入使用（在浏览器中通过<script type="module">）
- vue(.runtime).esm-bundle.js
  - 用于构建工具，默认使用的是vue.runtime.esm-bundle.js
  - 如果我们需要解析模板，那么就要手动指定vue.esm-bundle.js
  ```js
    import { createApp } from 'vue/dist/vue.esm-bundler'
  ```
- vue.cjs(.prod).js
  服务端渲染使用的，通过require导入

## 三种方式在编写DOM时
- template模板
- render函数的方式，使用h函数编写
- 通过.vue文件，使用vue-loader进行解析
  
## vue-loader
- 安装依赖
  ```js
  npm i vue-loader@next @vue/compiler-sfc -D
  ```
- 使用
  ```js
  const {VueLoaderPlugin} = require('vue-loader/dist/index')
  module.exports = {
    ...
    module: {
      rules: [
        ...
        {
          test: /\.vue$/,
          loader: "vue-loader"
        }
      ]
    },

    plugins: [
      ...
      new VueLoaderPlugin()
    ]
  }
  ```

# devServer
搭建本服务，监听代码的变化并实现实时编译

## 三种自动编译的方法
- webpack watch mode
- webpack-dev-server
- webpack-dev-middleware

## webpack watch mode
开启watch的两种方式：
- 配置文件中添加：watch: true
  
- 启动webpack命令中添加--watch标识
  ```js
    "build": "webpack --watch"
  ```

这种方式只能实现自动编译，不能实现浏览器的刷新

## webpack-dev-server
- 安装
  ```js
    npm i webpack-dev-server -D
  ```
- 在package.json中添加脚本
  ```js
    ...
    "scripts": {
      ...
      "serve": "webpack serve"
    }
    ...
  ```
- 运行
  npm run serve
- 启动之后，并没有将源代码打包生成之后并没有将文件写出，build目录是空的，实际上将资源保存到了内存中使用的memfs包来实现的
- 使用
  - 开发阶段：contentBase
  - 生产环境：copy-webpack-plugin
- 配置devServer
- 模块的热替换(HMR)
  指应用程序运行过程中，替换，添加，删除模块，而无需重新刷新整个页面
  ```js
  module.exports = {
    target: "web", // node
    devServe: {
      hot: true
    }
  }
  ```
- 在引入模块的文件中
  ```js
  if(module.hot){
    module.hot.accept("./js/element.js",  () => {
      console.log("element模块发生了更新")  ;
    })

    module.hot.accept("(URL)",  () => {
      console.log("e模块发生了更新")  ;
    })
  }
  ```
- 说明
  对js文件需要进行上面的配置，vue文件在vue-loader中已经内置了对热模块更新的配置
- HMR原理
  - webpack-dev-server会创建两个服务：
    - 提供静态资源服务（express）
    - Socket服务
  - express server负责直接提供静态资源服务
  <img src="../vue3-webpack/src/images/HMR原理.png">
  - 建立长连接双方都可进行通信
  - 当服务器监听到对应模块发生变化时，会生成两个文件json,js
  - 通过长连接，可以直接将这两个文件主动发送给客户端
  - 浏览器拿到两个新文件之后，通过HRM runtime机制，加载这两个文件，并且针对修改的模块进行更新

## host主机地址
- 默认时localhost
- localhost本质上是一个域名，通常情况下会解析成127.0.0.1
- 127.0.0.1：回环地址(Loop Back Address)，表达的意思其实是我们主机自己发出去的包，直接被自己接收;
  - 正常的数据库包经常 应用层 - 传输层 - 网络层 - 数据链路层 - 物理层 ;
  - 而回环地址，是在网络层直接就被获取到了，是不会经常数据链路层和物理层的;
  - 比如我们监听 127.0.0.1时，在同一个网段下的主机中，通过ip地址是不能访问的;
  - p0.0.0.0：监听IPV4上所有的地址，再根据端口找到不同的应用程序;
  - 比如我们监听 0.0.0.0时，在同一个网段下的主机中，通过ip地址是可以访问的

# resolve模块解析
## resolve用于设置模块如何被解析：
- 在开发中我们会有各种各样的模块依赖，这些模块可能来自于自己编写的代码，也可能来自第三方库；
- resolve可以帮助webpack从每个 require/import 语句中，找到需要引入到合适的模块代码；
- webpack 使用 enhanced-resolve 来解析文件路径；

## webpack能解析三种文件路径：
- 绝对路径
  由于已经获得文件的绝对路径，因此不需要再做进一步解析。
- 相对路径
  - 在这种情况下，使用 import 或 require 的资源文件所处的目录，被认为是上下文目录；
  - 在 import/require 中给定的相对路径，会拼接此上下文路径，来生成模块的绝对路径；
- 模块路径
  - 在 resolve.modules中指定的所有目录检索模块；
    默认值是 ['node_modules']，所以默认会从node_modules中查找文件；
  - 我们可以通过设置别名的方式来替换初识模块路径，具体后面讲解alias的配置；

## 确定
-  如果是一个文件：
   - 如果文件具有扩展名，则直接打包文件；
   - 否则，将使用 resolve.extensions选项作为文件扩展名解析；
-  如果是一个文件夹：
  - 会在文件夹中根据 resolve.mainFiles配置选项中指定的文件顺序查找；
      - resolve.mainFiles的默认值是 ['index']；
      - 再根据 resolve.extensions来解析扩展名；

## extensions和alias配置
  - extensions是解析到文件时自动添加扩展名：
   - 默认值是 ['.wasm', '.mjs', '.js', '.json']；
   - 所以如果我们代码中想要添加加载 .vue 或者 jsx 或者 ts 等文件时，我们必须自己写上扩展名；
  - 另一个非常好用的功能是配置别名alias：
   - 特别是当我们项目的目录结构比较深的时候，或者一个文件的路径可能需要 ../../../这种路径片段；
   - 我们可以给某些常见的路径起一个别名

# 区分开发环境和生产环境
```js
- config
  - webpack-commen-config.js
  - webpack-dev-config.js
  - webpack-prod-config.js
```

- 合并
  ```js
  npm i webpack-merge -D
  ```
  - 使用
  ```js
  const { merge } = require("webpack-merge")
  const commenConfig = require("./webpack_commen_config")

  module.exports = merge(commenConfig, {/* 原来的配置 */})
  ```