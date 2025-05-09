<template>
  <view>
    <page-head v-if="showHeader"></page-head>
    <view class="content">
      <router-view></router-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showHeader: true
    }
  },
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
@import '/static/css/main.css';
@import '/uni_modules/vk-uview-ui/index.scss';
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
page {
  background-color: rgba(0, 0, 0, 0);
}
</style>
