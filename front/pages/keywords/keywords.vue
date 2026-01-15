<template>
  <view class="keywords-screen">
    <view class="toolbar">
      <u-button @click="generateKeywords">{{ $t('KeywordsScreen.Generate') }}</u-button>
      <u-button @click="toggleMode">{{ mode === 'keywords' ? $t('KeywordsScreen.SwitchToText') : $t('KeywordsScreen.SwitchToKeywords') }}</u-button>
    </view>
    <view v-if="mode === 'keywords'" class="list">
      <view v-for="(k,i) in keywords" :key="i" class="item">
        <text>{{ k }}</text>
      </view>
    </view>
    <view v-else class="text">
      <text>{{ scriptStore.text }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { useScriptStore } from '@/stores/script'
import { keywords as apiKeywords } from '@/services/llm'

const scriptStore = useScriptStore()
const keywords = ref(scriptStore.keywordsCache || [])
const mode = ref('keywords')
const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const generateKeywords = async () => {
  const list = await apiKeywords({ baseUrl, text: scriptStore.text })
  keywords.value = list
  scriptStore.setKeywords(list)
}
const toggleMode = () => {
  mode.value = mode.value === 'keywords' ? 'text' : 'keywords'
}
</script>

<style lang="scss" scoped>
.keywords-screen {
  padding: 32rpx;
}
.toolbar {
  display: flex;
  gap: 24rpx;
  margin-bottom: 24rpx;
}
.list {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}
.item {
  padding: 8rpx 16rpx;
  background: #f0f0f0;
  border-radius: 8rpx;
}
.text {
  white-space: pre-wrap;
}
</style>
