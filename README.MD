# Webpack的安装

<mark>先全局安装</mark>
```js
npm i webpack webpack-cli -g
```

## webpack webpack-cli的关系
- 执行webpack命令，会执行node_module下的bin目录下的webpack
- webpack在执行时是依赖webpack-cli的，而webpack-cli执行时，才是真正利用webpack进行编译和打包
- 一般框架的脚手架里面并没有webpack-cli，如vue-cli，他有类似于自己的vue-server-cli的东西