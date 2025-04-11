<template>
  <view class="home-screen">
    <u-toast ref="uToast1" />
    <view class="input-area">
      <u-input
        type="textarea"
        v-model="scriptText"
        clearable
        :maxlength="99999"
        adjust-position
        border
        :auto-height="false"
        height="1200"
        :placeholder="$t('HomeScreen.TextField_hintText')"
        class="script-input"
      />
    </view>

    <view class="u-button-group">
      <u-button @click="startPrompter">
        {{ $t('HomeScreen.ElevatedButton_Start') }}
      </u-button>
      <u-button @click="openFile">
        {{ $t('HomeScreen.ElevatedButton_Select') }}
      </u-button>
      <u-button @click="showSaveDialog">
        {{ $t('HomeScreen.ElevatedButton_Save') }}
      </u-button>
    </view>

    <view class="bottom-bar">
      <view class="icon-group">
        <view @tap="goToSettings">
          <uni-icons type="gear" size="24" />
        </view>

        <view @tap="showAboutDialog">
          <uni-icons type="info" size="24" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScriptStore } from '@/stores/script'
import { kApplicationVersion } from '@/core/constants.js'

const { t } = useI18n()
const scriptStore = useScriptStore()
const scriptText = ref('')
const uToast1 = ref(null)
onMounted(() => {
  scriptText.value = scriptStore.text
})

const storeText = computed(() => scriptStore.text)
watch(storeText, newValue => {
  scriptText.value = newValue
})

const startPrompter = () => {
  scriptStore.setText(scriptText.value)
  uni.navigateTo({
    url: '/pages/prompter/prompter'
  })
}

const openFile = () => {
  uni.navigateTo({
    url: '/pages/open-file/open-file'
  })
}

const showSaveDialog = () => {
  scriptStore.setText(scriptText.value)
  uni.showModal({
    title: t('HomeScreen.BottomSheet.Text_Title'),
    editable: true,
    placeholderText: t('HomeScreen.BottomSheet.TextField_hintText'),
    success: res => {
      if (res.confirm && res.content) {
        uToast1.value.show({
          title: t('HomeScreen.Text_Saved'),
          type: 'success'
        })
        scriptStore.setTitle(res.content)
        scriptStore.saveScript()
      }
    }
  })
}

const goToSettings = () => {
  uni.navigateTo({
    url: '/pages/settings/settings'
  })
}

const showAboutDialog = () => {
  uni.showModal({
    title: t('HomeScreen.IconButton_About'),
    content: `WordPrompt ${kApplicationVersion}`,
    showCancel: false
  })
}
</script>

<style lang="scss" scoped>
.home-screen {
  padding: 32rpx;
}

.input-area {
  margin-bottom: 32rpx;
}

.script-input {
  width: 100%;
  padding: 16rpx;
}

.u-button-group {
  display: flex;
  justify-content: center;
  gap: 32rpx;
  margin-bottom: 32rpx;
}

.bottom-bar {
  display: flex;
  justify-content: center;
  padding: 24rpx 32rpx;
}

.icon-group {
  display: flex;
  gap: 32rpx;
}
</style>
