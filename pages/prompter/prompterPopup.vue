<template>
  <u-popup
    v-model="showPopup"
    mode="bottom"
    mask-close-able
    length="25%"
    border-radius="14"
  >
    <view style="padding: 20px; width: 80vw">
      <view class="font-size-buttons">
        <text class="draw-text-width">字体大小</text>
        <u-button
          type="primary"
          size="mini"
          shape="circle"
          @click="setFontSize('minus')"
        >
          <u-icon name="minus" size="30"></u-icon>
        </u-button>
        <text style="font-size: 16px">{{ fontSize }}</text>

        <u-button
          type="primary"
          size="mini"
          shape="circle"
          @click="setFontSize('plus')"
        >
          <u-icon name="plus" size="30"></u-icon>
        </u-button>
      </view>
      <view class="font-size-buttons">
        <text class="draw-text-width">与边缘的宽度</text>
        <u-button
          type="primary"
          size="mini"
          shape="circle"
          @click="setsideMargin('minus')"
        >
          <u-icon name="minus" size="30"></u-icon>
        </u-button>
        <text style="font-size: 16px">{{ settingsStore.sideMargin }}</text>

        <u-button
          type="primary"
          size="mini"
          shape="circle"
          @click="setsideMargin('plus')"
        >
          <u-icon name="plus" size="30"></u-icon>
        </u-button>
      </view>

      <view class="font-size-buttons">
        <text class="draw-text-width">提词器倒计时</text>
        <u-button
          type="primary"
          size="mini"
          shape="circle"
          @click="setsideCountdownDuration('minus')"
        >
          <u-icon name="minus" size="30"></u-icon>
        </u-button>
        <text style="font-size: 16px">{{
          settingsStore.countdownDuration
        }}</text>

        <u-button
          type="primary"
          size="mini"
          shape="circle"
          @click="setsideCountdownDuration('plus')"
        >
          <u-icon name="plus" size="30"></u-icon>
        </u-button>
      </view>
    </view>
  </u-popup>
</template>

<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const props = defineProps({
  showPopup: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:showPopup'])

const settingsStore = useSettingsStore()

const fontSize = computed(() => settingsStore.fontSize)

const showPopup = computed({
  get: () => props.showPopup,
  set: value => {
    emit('update:showPopup', value)
  }
})
const setFontSize = type => {
  type == 'plus'
    ? settingsStore.setFontSize(fontSize.value + 2)
    : settingsStore.setFontSize(fontSize.value - 2)
}

const setsideMargin = type => {
  type == 'plus'
    ? settingsStore.setSideMargin(settingsStore.sideMargin + 2)
    : settingsStore.setSideMargin(settingsStore.sideMargin - 2)
}

const setsideCountdownDuration = type => {
  type == 'plus'
    ? settingsStore.setCountdownDuration(settingsStore.countdownDuration + 1)
    : settingsStore.setCountdownDuration(settingsStore.countdownDuration - 1)
}
</script>

<style lang="scss" scoped>
.font-size-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20rpx;
  margin-top: 30rpx;
  color: #fff;
}
.draw-text-width {
  width: 250rpx;
}
</style>
