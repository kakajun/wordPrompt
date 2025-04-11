<template>
  <view class="prompter-screen">
    <view @tap="toggleControls">
      <view class="text-container" :style="containerStyle">
        <scroll-view
          :scroll-y="true"
          :scroll-top="scrollTop"
          class="scrollable-text"
          :style="textStyle"
          style="height: calc(100vh - 63px)"
        >
          <text>{{ scriptText }}</text>
        </scroll-view>
      </view>
      <view class="controls" v-if="controlsVisible">
        <view v-for="btn in btns" :key="btn.action">
          <u-button
            type="primary"
            size="mini"
            shape="circle"
            @click="handleIconClick(btn.action)"
            customStyle="background: transparent; border: none; padding: 0;"
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
        <text class="countdown-text">{{ countdownValue }}</text>
      </view>
    </view>
    <u-popup
      v-model="showPopup"
      mode="bottom"
      mask-close-able
      length="10%"
      border-radius="14"
    >
      <view style="padding: 20px; width: 80vw">
        <view
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            margin-top: 10px;
          "
        >
          <text>字体大小</text>
          <u-button
            type="primary"
            size="mini"
            shape="circle"
            @click="
              settingsStore.setFontSize(
                Math.max(12, settingsStore.fontSize - 1)
              )
            "
          >
            <u-icon name="minus" size="30"></u-icon>
          </u-button>
          <text style="font-size: 16px">{{ settingsStore.fontSize }}</text>
          <!-- 直接显示store中的值 -->
          <u-button
            type="primary"
            size="mini"
            shape="circle"
            @click="
              settingsStore.setFontSize(
                Math.min(72, settingsStore.fontSize + 1)
              )
            "
          >
            <u-icon name="plus" size="30"></u-icon>
          </u-button>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useScriptStore } from '@/stores/script'
import { useSettingsStore } from '@/stores/settings'
import { btns } from './tool.js'

export default {
  setup() {
    const scriptStore = useScriptStore()
    const settingsStore = useSettingsStore()
    const isPlaying = ref(false)
    const scrollTop = ref(0)
    const controlsVisible = ref(true)
    const showCountdown = ref(false)
    const countdownValue = ref(3)
    const showPopup = ref(false)

    const fontSize = ref(settingsStore.fontSize)
    const scrollSpeed = computed(() => settingsStore.scrollSpeed) // 改为计算属性

    let scrollInterval = null
    const containerStyle = computed(() => ({
      transform: `scaleX(${settingsStore.mirroredX ? -1 : 1}) scaleY(${
        settingsStore.mirroredY ? -1 : 1
      })`
    }))

    const textStyle = computed(() => ({
      fontSize: `${fontSize.value}rpx`,
      fontFamily: settingsStore.fontFamily,
      textAlign: settingsStore.alignment,
      padding: `0 ${settingsStore.sideMargin}%`
    }))

    const startScrolling = () => {
      if (settingsStore.countdownDuration > 0) {
        showCountdown.value = true
        countdownValue.value = settingsStore.countdownDuration
        const countdownInterval = setInterval(() => {
          countdownValue.value--
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

    const onFontSizeChange = e => {
      fontSize.value = e.detail.value
    }

    const onSpeedChange = e => {
      scrollSpeed.value = e.detail.value
    }
    const handleIconClick = action => {
      switch (action) {
        case 'list':
          break
        case 'minus':
          break
        case 'play':
          togglePlayPause()
          break
        case 'plus':
          settingsStore.setScrollSpeed(settingsStore.scrollSpeed + 0.1) // 直接修改store
          break
        case 'minus':
          settingsStore.setScrollSpeed(settingsStore.scrollSpeed - 0.1) // 直接修改store
          break
        case 'font':
          showPopup.value = true
          settingsStore.setFontSize()
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

    return {
      scriptText: scriptStore.text,
      isPlaying,
      scrollTop,
      controlsVisible,
      showCountdown,
      countdownValue,
      fontSize,
      scrollSpeed,
      containerStyle,
      textStyle,
      togglePlayPause,
      toggleControls,
      onFontSizeChange,
      onSpeedChange,
      handleIconClick,
      btns,
      showPopup
    }
  }
}
</script>

<style lang="scss" scoped>
.prompter-screen {
  position: relative;
  width: 100vw;
  height: calc(100vh - 44px);
  background-color: #000;
}

.text-container {
  height: 100%;
  color: #fff;
}

.scrollable-text {
  height: 100%;
  padding: 32rpx;
}
.controls {
  background: rgba(134, 133, 133);
  position: absolute;
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
}

.countdown-text {
  font-size: 120rpx;
  color: #fff;
}

.u-mask {
  background-color: rgba(0, 0, 0, 1);
}
</style>
