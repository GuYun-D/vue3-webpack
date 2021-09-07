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
  - .\node_modules\.bin\webpack(注意必须是“\”,而不是“/”)
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