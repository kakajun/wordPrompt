<template>
  <view class="open-file-screen">
    <view class="button-container">
      <button @tap="selectFile" type="primary">
        {{ $t('OpenFileScreen.ElevatedButton_Select') }}
      </button>
    </view>

    <view class="file-list" v-if="scripts.length > 0">
      <view
        v-for="script in scripts"
        :key="script.id"
        class="file-item"
      >
        <view class="file-info" @tap="loadScript(script.id)">
          <text class="file-title">{{ script.title }}</text>
          <text class="file-date">{{ script.createdAt }}</text>
        </view>
        <view class="file-actions">
          <uni-icons
            type="trash"
            size="24"
            @tap="deleteScript(script.id)"
          />
        </view>
      </view>
    </view>

    <view class="empty-state" v-else>
      <text class="empty-text">
        {{ $t('OpenFileScreen.if_empty') }}
      </text>
    </view>
  </view>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScriptStore } from '@/stores/script'

export default {
  setup() {
    const { t } = useI18n()
    const scriptStore = useScriptStore()
    const scripts = ref([])

    onMounted(async () => {
      loadScripts()
    })

    const loadScripts = async () => {
      scripts.value = await scriptStore.getScripts()
    }

    const selectFile = async () => {
      try {
        const [fileInfo] = await uni.chooseFile({
          count: 1,
          extension: ['.txt']
        })

        if (fileInfo) {
          const fileContent = await uni.getFileSystemManager().readFileSync(
            fileInfo.path,
            'utf8'
          )

          scriptStore.setText(fileContent)
          scriptStore.setTitle(fileInfo.name)
          uni.navigateBack()
        }
      } catch (error) {
        console.error('File selection error:', error)
      }
    }

    const loadScript = async (scriptId) => {
      const content = await scriptStore.loadScript(scriptId)
      scriptStore.setText(content)
      uni.navigateBack()
    }

    const deleteScript = async (scriptId) => {
      await scriptStore.deleteScript(scriptId)
      loadScripts()
    }

    return {
      scripts,
      selectFile,
      loadScript,
      deleteScript
    }
  }
}
</script>

<style>
.open-file-screen {
  padding: 32rpx;
}

.button-container {
  margin-bottom: 32rpx;
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
}

.file-info {
  flex: 1;
}

.file-title {
  font-size: 32rpx;
  margin-bottom: 8rpx;
}

.file-date {
  font-size: 24rpx;
  color: #666;
}

.empty-state {
  padding: 64rpx 32rpx;
  text-align: center;
}

.empty-text {
  font-size: 36rpx;
  color: #666;
}
</style>
