<template>
  <view class="prompter-screen">
    <view class="safe-area-top"></view>
    <view class="text-content" @tap="toggleControls">
      <view :style="containerStyle">
        <scroll-view
          :scroll-y="true"
          :scroll-top="scrollTop"
          class="scrollable-text"
          :style="textStyle"
          style="height: calc(100vh - 44px)"
          @scroll="handleTouchMove"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
          :scroll-with-animation="false"
          :enable-flex="true"
        >
          <text>{{ scriptStore.text }}</text>
        </scroll-view>
      </view>
      <view class="controls" v-if="controlsVisible">
        <view v-for="btn in btns" :key="btn.action">
          <u-button
            type="primary"
            size="mini"
            shape="circle"
            @click="handleIconClick(btn.action)"
            :customStyle="{
              background: 'transparent',
              border: 'none',
              padding: 0
            }"
          >
            <u-icon
              v-if="btn.action == 'play'"
              :name="isPlaying ? 'pause' : 'play-right-fill'"
              size="30"
            ></u-icon>
            <u-icon v-else :name="btn.icon" size="30"></u-icon>
          </u-button>
        </view>
      </view>

      <view class="countdown" v-if="showCountdown">
        <view class="countdown-container">
          <div class="progress-background"></div>
          <div class="progress-ring" id="progressRing"></div>
          <text class="countdown-text">{{ countdownValue }}</text>
        </view>
      </view>
    </view>
    <prompterPopup v-model:showPopup="showPopup"></prompterPopup>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useScriptStore } from '@/stores/script'
import { useSettingsStore } from '@/stores/settings'
import { btns } from './tool.js'
import prompterPopup from './prompterPopup'

const scriptStore = useScriptStore()
const settingsStore = useSettingsStore()

const isPlaying = ref(false)
const scrollTop = ref(0)
const controlsVisible = ref(true)
const showCountdown = ref(false)
const countdownValue = ref(3)
const showPopup = ref(false)

let scrollInterval = null
const containerStyle = computed(() => ({
  background: settingsStore.transparentBackground ? 'transparent' : '#000',
  color: settingsStore.transparentBackground ? '#000' : '#fff',
  transform: `scaleX(${settingsStore.mirroredX ? -1 : 1}) scaleY(${
    settingsStore.mirroredY ? -1 : 1
  })`
}))

const fontSize = computed(() => settingsStore.fontSize)
const textStyle = computed(() => ({
  fontSize: `${fontSize.value}rpx`,
  fontFamily: settingsStore.fontFamily,
  textAlign: settingsStore.alignment,
  padding: `0 ${settingsStore.sideMargin}%`,
  boxSizing: 'border-box',
  lineHeight: `${fontSize.value * settingsStore.lineHeightRate}rpx`
}))

const updateProgress = count => {
  const progressRing = document.getElementById('progressRing')
  const progress = (count / settingsStore.countdownDuration) * 360
  progressRing.style.setProperty('--progress', `${progress}deg`)
}
const startScrolling = () => {
  if (settingsStore.countdownDuration > 0) {
    showCountdown.value = true
    countdownValue.value = settingsStore.countdownDuration
    const countdownInterval = setInterval(() => {
      countdownValue.value--
      countdownValue.value > 0 && updateProgress(countdownValue.value)
      if (countdownValue.value <= 0) {
        clearInterval(countdownInterval)
        showCountdown.value = false
        startAutoScroll()
      }
    }, 1000)
  } else {
    startAutoScroll()
  }
}
const startAutoScroll = () => {
  isPlaying.value = true
  scrollInterval = setInterval(() => {
    scrollTop.value += settingsStore.scrollSpeed * 0.2 // 直接使用store中的值
  }, 50)
}

const stopScrolling = () => {
  isPlaying.value = false
  if (scrollInterval) {
    clearInterval(scrollInterval)
    scrollInterval = null
  }
}

const togglePlayPause = () => {
  if (isPlaying.value) {
    stopScrolling()
  } else {
    startScrolling()
  }
}

const toggleControls = () => {
  controlsVisible.value = !controlsVisible.value
}
const handleIconClick = action => {
  switch (action) {
    case 'list':
      break
    case 'minus':
      settingsStore.setScrollSpeed(settingsStore.scrollSpeed - 0.5) // 直接修改store
      break
    case 'play':
      togglePlayPause()
      break
    case 'plus':
      settingsStore.setScrollSpeed(settingsStore.scrollSpeed + 0.5) // 直接修改store
      break

    case 'font':
      showPopup.value = true
      break
    case 'setting':
      uni.navigateTo({
        url: '/pages/settings/settings'
      })
      break
  }
}
onMounted(() => {
  // Platform-specific implementation
  if (process.env.VUE_APP_PLATFORM === 'h5') {
    // H5-specific screen wake lock API
    if ('wakeLock' in navigator) {
      navigator.wakeLock
        .request('screen')
        .catch(err => console.error('Wake Lock failed:', err))
    }
  } else if (uni.setKeepScreenOn) {
    uni.setKeepScreenOn({ keepScreenOn: true })
  }
})

onUnmounted(() => {
  stopScrolling()
  if (process.env.VUE_APP_PLATFORM === 'h5') {
    // Release H5 wake lock if exists
    if ('wakeLock' in navigator && window.wakeLockObj) {
      window.wakeLockObj.release().then(() => (window.wakeLockObj = null))
    }
  } else if (uni.setKeepScreenOn) {
    uni.setKeepScreenOn({ keepScreenOn: false })
  }
})

const isDragging = ref(false)

const handleTouchStart = e => {
  stopScrolling()
  isDragging.value = true
}

const handleTouchMove = e => {
  if (isDragging.value) {
    nextTick(function () {
      scrollTop.value = e.detail.scrollTop
    })
  }
}

const handleTouchEnd = () => {
  isDragging.value = false
}
</script>

<style lang="scss" scoped>
.prompter-screen {
  display: flex;
  position: relative;
  width: 100vw;
  /* 修改为使用安全区域计算 */
  height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
}

.controls {
  position: fixed;
  background: rgba(134, 133, 133);
  display: flex;
  align-items: center;
  justify-content: space-around; /* 添加这行使图标均匀分布 */
  height: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 16rpx; /* 可选：添加一些内边距 */
}

.top-bar {
  position: absolute;
  top: 0;
  width: 100%;
  padding: 32rpx;
  background: rgba(0, 0, 0, 0.5);
}

.countdown {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .countdown-container {
    position: relative;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .countdown-text {
    position: relative;
    z-index: 2;
    width: 160px;
    height: 160px;
    background: rgb(8, 3, 3);
    border-radius: 50%;
    font-size: 60px;
    font-weight: bold;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 160px; /* 确保垂直居中 */
  }
  .progress-ring,
  .progress-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
.countdown-text {
  font-size: 120rpx;
  color: #fff;
}

.u-mask {
  background-color: rgba(0, 0, 0, 1);
}
.progress-ring {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  --progress: 360deg;
  background: conic-gradient(
    #3498db 0%,
    var(--progress),
    transparent var(--progress),
    transparent 100%
  );
  z-index: 1;
}
.progress-background {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #426983;
  z-index: 0;
}
::v-deep {
  .u-drawer-bottom {
    background-color: #534f4f;
  }
  .u-mask-show {
    background-color: rgba(0, 0, 0, 0.1) !important;
  }
  .scrollable-text {
    .uni-scroll-view-content {
      padding-top: 50%;
      uni-text {
        padding-bottom: 50%;
      }
    }
  }
  .u-drawer__scroll-view {
    .uni-scroll-view-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
.safe-area-top {
  height: env(safe-area-inset-top);
 // width: 100%;
}

.safe-area-bottom {
  height: env(safe-area-inset-bottom);
  width: 100%;
}
.scrollable-text {
  touch-action: pan-y;
  user-select: none;
}
</style>
