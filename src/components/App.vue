<template>
  <mark>我是vue渲染出来的，{{ msg }}</mark>
</template>

<script>
export default {
  // data() {
  //   return {
  //     msg: "哈哈哈啊哈哈哈哈",
  //   };
  // }
  setup(){
    const msg = "日"
    return {msg}
  }
};
</script>

<style lang="less" scoped>

</style> 