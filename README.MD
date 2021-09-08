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
