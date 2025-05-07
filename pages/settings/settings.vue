<template>
  <view class="settings-screen">
    <view class="settings-list">
      <view class="settings-item">
        <text>{{
          $t('SettingsScreen.DropdownAppSetting_DefaultLanguage')
        }}</text>
        <picker
          :value="currentLanguageIndex"
          :range="languages"
          @change="onLanguageChange"
        >
          <text>{{ languages[currentLanguageIndex] }}</text>
        </picker>
      </view>

      <view class="settings-item">
        <text>{{
          $t('SettingsScreen.NumberAppSetting_DefaultScrollSpeed')
        }}</text>
        <slider
          style="width: 50%"
          :value="settings.scrollSpeed"
          :min="1"
          :max="15"
          :step="0.5"
          show-value
          @change="onScrollSpeedChange"
        />
      </view>

      <view class="settings-item">
        <text>{{ $t('SettingsScreen.NumberAppSetting_DefaultFontSize') }}</text>
        <slider
          style="width: 50%"
          :value="settings.fontSize"
          :min="20"
          :max="100"
          :step="1"
          show-value
          @change="onFontSizeChange"
        />
      </view>

      <view class="settings-item">
        <text>{{
          $t('SettingsScreen.DropdownAppSetting_DefaultTextAlignment')
        }}</text>
        <picker
          :value="currentAlignmentIndex"
          :range="alignments"
          @change="onAlignmentChange"
        >
          <text>{{ alignments[currentAlignmentIndex] }}</text>
        </picker>
      </view>

      <view class="settings-item" @tap="openFontPicker">
        <text>{{
          $t('SettingsScreen.DropdownAppSetting_DefaultFontFamily')
        }}</text>
        <text>{{ fontName }}</text>
      </view>

      <view class="settings-item">
        <text>{{ $t('SettingsScreen.BooleanAppSetting_DefaultFlipX') }}</text>
        <switch :checked="settings.mirroredX" @change="onMirroredXChange" />
      </view>

      <view class="settings-item">
        <text>{{ $t('SettingsScreen.BooleanAppSetting_DefaultFlipY') }}</text>
        <switch :checked="settings.mirroredY" @change="onMirroredYChange" />
      </view>
      <view class="settings-item">
        <text>{{ $t('SettingsScreen.NumberAppSetting_SideMargin') }}</text>
        <slider
          style="width: 50%"
          :value="settings.sideMargin"
          :min="0"
          :max="99"
          :step="1"
          show-value
          @change="onSideMarginChange"
        />
      </view>

      <view class="settings-item">
        <text>{{ $t('SettingsScreen.NumberAppSetting_LineHeight') }}</text>
        <slider
          style="width: 50%"
          :value="settings.lineHeightRate"
          :min="1"
          :max="2"
          :step="0.1"
          show-value
          @change="onCountdownLineHeight"
        />
      </view>

      <button class="reset-button" @tap="resetSettings">
        {{ $t('SettingsScreen.ListTile_Reset') }}
      </button>
    </view>
    <u-picker
      mode="selector"
      v-model="isFontPickerVisible"
      :range="fontList"
      range-key="name"
      :default-selector="[currentFontIndex]"
      @confirm="onFontChange"
      @cancel="isFontPickerVisible = false"
    />
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/stores/settings'
import { kSupportedLocales, fontList } from '@/core/constants'

const { t, locale } = useI18n()
const settingsStore = useSettingsStore()
const settings = ref(settingsStore.$state)

// 语言相关
const languages = kSupportedLocales.map(l => l[0])
const languagesValues = kSupportedLocales.map(l => l[1])
const currentLanguageIndex = computed(() =>
  languagesValues.findIndex(l => l === locale.value)
)

// 对齐方式相关
const alignments = [
  t('SettingsScreen.DropdownAppSetting_DefaultTextAlignment_Unit.Left'),
  t('SettingsScreen.DropdownAppSetting_DefaultTextAlignment_Unit.Center'),
  t('SettingsScreen.DropdownAppSetting_DefaultTextAlignment_Unit.Right'),
  t('SettingsScreen.DropdownAppSetting_DefaultTextAlignment_Unit.Justified')
]
const alignmentValues = ['left', 'center', 'right', 'justify']
const currentAlignmentIndex = computed(() =>
  alignmentValues.findIndex(a => a === settings.value.alignment)
)

// 字体相关
const isFontPickerVisible = ref(false) // 控制字体选择器的显示状态
const fontObj = computed(() => {
  const obj = fontList.find(o => o.value == settingsStore.fontFamily)
  return obj
})
const fontName = computed(() => fontObj.value.name)
const currentFontIndex = computed(() =>
  fontList.findIndex(o => o.value == settingsStore.fontFamily)
)
const openFontPicker = () => {
  isFontPickerVisible.value = true
}
const onFontChange = e => {
  const selectedFontIndex = e[0] // 获取选中的索引
  const obj = fontList[selectedFontIndex]
  settingsStore.setFontFamily(obj.value)
  isFontPickerVisible.value = false // 关闭选择器
}

// 事件处理函数
const onLanguageChange = e => {
  const newLocale = kSupportedLocales[e.detail.value][1]
  locale.value = newLocale
}

const onScrollSpeedChange = e => {
  const speed = parseFloat(e.detail.value).toFixed(1)
  settingsStore.setScrollSpeed(parseFloat(speed))
}

const onFontSizeChange = e => {
  settingsStore.setFontSize(e.detail.value)
}

const onAlignmentChange = e => {
  settingsStore.setAlignment(alignmentValues[e.detail.value])
}

const onMirroredXChange = e => {
  settingsStore.setMirroredX(e.detail.value)
}

const onMirroredYChange = e => {
  settingsStore.setMirroredY(e.detail.value)
}

const onSideMarginChange = e => {
  settingsStore.setSideMargin(e.detail.value)
}

const onCountdownLineHeight = e => {
  settingsStore.setCountdownLineHeight(e.detail.value)
}

const resetSettings = () => {
  settingsStore.resetSettings()
}
</script>

<style lang="scss" scoped>
.settings-screen {
  padding: 32rpx;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.settings-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reset-button {
  margin-top: 32rpx;
}
</style>
