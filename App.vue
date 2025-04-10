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
  onLaunch: function() {
    console.log('App Launch')
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

<style>
@import '/static/css/main.css';
@import "./uni_modules/vk-uview-ui/index.scss";
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
