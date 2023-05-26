<template>
  <div class="top-page">
    <div class="title">トップページ</div>
    <div>
      <router-link :to="{ name: 'SamplePage' }">サンプルページを見る</router-link>
    </div>
    <div>
      <router-link :to="{ name: 'PracticePage' }">練習用</router-link>
    </div>
    <div>
      <router-link :to="{ name: 'OldVueHome'}">旧Vue課題</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TopPage',
}
</script>

<style lang="scss" scoped>
.top-page {
  .title {
    font-size: 36px;
    font-weight: bold;
  }
}
</style>
