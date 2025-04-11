<template>
  <view class="home-screen">
    <view class="input-area">
      <textarea
        v-model="scriptText"
        :maxlength='99999'
        :placeholder="$t('HomeScreen.TextField_hintText')"
        class="script-input"
      />
    </view>

    <view class="button-group">
      <button @tap="startPrompter" type="primary">
        {{ $t('HomeScreen.ElevatedButton_Start') }}
      </button>
      <button @tap="openFile" type="primary">
        {{ $t('HomeScreen.ElevatedButton_Select') }}
      </button>
      <button @tap="showSaveDialog" type="primary">
        {{ $t('HomeScreen.ElevatedButton_Save') }}
      </button>
    </view>

    <view class="bottom-bar">
      <view class="icon-group">
        <view @tap="goToSettings">
          <uni-icons type="gear" size="24" />
        </view>
        <view @tap="openSourceCode">
          <uni-icons type="code" size="24" />
        </view>
        <view @tap="showAboutDialog">
          <uni-icons type="info" size="24" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScriptStore } from '@/stores/script'
import { kApplicationVersion } from '@/core/constants.js'
export default {
  setup() {
    const { t } = useI18n()
    const scriptStore = useScriptStore()
    const scriptText = ref('')

    onMounted(() => {
      scriptText.value = scriptStore.text
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
      uni.showModal({
        title: t('HomeScreen.BottomSheet.Text_Title'),
        editable: true,
        placeholderText: t('HomeScreen.BottomSheet.TextField_hintText'),
        success: res => {
          if (res.confirm && res.content) {
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

    const openSourceCode = () => {
      uni.setClipboardData({
        data: 'https://github.com/tiefseetauchner/tiefprompt',
        success: () => {
          uni.showToast({
            title: t('HomeScreen.IconButton_SourceCode_Copied'),
            icon: 'success'
          })
        }
      })
    }

    const showAboutDialog = () => {
      uni.showModal({
        title: t('HomeScreen.IconButton_About'),
        content: `WordPrompt ${kApplicationVersion}`,
        showCancel: false
      })
    }

    return {
      scriptText,
      startPrompter,
      openFile,
      showSaveDialog,
      goToSettings,
      openSourceCode,
      showAboutDialog
    }
  }
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
  height: 800rpx;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 8rpx;
  padding: 16rpx;
}

.button-group {
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
