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
          :min="0.1"
          :max="20"
          :step="0.1"
          show-value
          @change="onScrollSpeedChange"
        />
      </view>

      <view class="settings-item">
        <text>{{ $t('SettingsScreen.NumberAppSetting_DefaultFontSize') }}</text>
        <slider
          style="width: 50%"
          :value="settings.fontSize"
          :min="12"
          :max="420"
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

      <view class="settings-item">
        <text>{{
          $t('SettingsScreen.DropdownAppSetting_DefaultFontFamily')
        }}</text>
        <picker :value="currentFontIndex" :range="fonts" @change="onFontChange">
          <text>{{ fonts[currentFontIndex] }}</text>
        </picker>
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
        <text>{{
          $t('SettingsScreen.BooleanAppSetting_ReadingIndicatorBoxes')
        }}</text>
        <switch
          :checked="settings.displayReadingIndicatorBoxes"
          @change="onDisplayReadingIndicatorBoxesChange"
        />
      </view>

      <view class="settings-item">
        <text>{{
          $t('SettingsScreen.NumberAppSetting_ReadingIndicatorBoxes')
        }}</text>
        <slider
          style="width: 50%"
          :value="settings.readingIndicatorBoxesHeight"
          :min="0"
          :max="100"
          :step="5"
          show-value
          @change="onReadingIndicatorBoxesHeightChange"
        />
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
        <text>{{ $t('SettingsScreen.NumberAppSetting_CountdownTimer') }}</text>
        <slider
          style="width: 50%"
          :value="settings.countdownDuration"
          :min="0"
          :max="60"
          :step="1"
          show-value
          @change="onCountdownDurationChange"
        />
      </view>

      <button class="reset-button" @tap="resetSettings">
        {{ $t('SettingsScreen.ListTile_Reset') }}
      </button>
    </view>
  </view>
</template>

<script>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/stores/settings'
import { kSupportedLocales, kAvailableFonts } from '@/core/constants'

export default {
  setup() {
    const { t, locale } = useI18n()
    const settingsStore = useSettingsStore()
    const settings = ref(settingsStore.$state)
    const languages = kSupportedLocales.map(l => l[0])
    const languagesValues = kSupportedLocales.map(l => l[1])
    const currentLanguageIndex = computed(() => {
      return languagesValues.findIndex(l => l === locale.value)
    })

    const alignments = [
      t('SettingsScreen.DropdownAppSetting_DefaultTextAlignment_Unit.Left'),
      t('SettingsScreen.DropdownAppSetting_DefaultTextAlignment_Unit.Center'),
      t('SettingsScreen.DropdownAppSetting_DefaultTextAlignment_Unit.Right'),
      t('SettingsScreen.DropdownAppSetting_DefaultTextAlignment_Unit.Justified')
    ]
    const alignmentValues = ['left', 'center', 'right', 'justify']
    const currentAlignmentIndex = computed(() => {
      return alignmentValues.findIndex(a => a === settings.value.alignment)
    })

    const fonts = kAvailableFonts
    const currentFontIndex = computed(() => {
      return fonts.findIndex(f => f === settings.value.fontFamily)
    })
    const currentScrollSpeedDisplay = ref(settingsStore.scrollSpeed.toFixed(1))
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

    const onFontChange = e => {
      settingsStore.setFontFamily(fonts[e.detail.value])
    }

    const onMirroredXChange = e => {
      settingsStore.setMirroredX(e.detail.value)
    }

    const onMirroredYChange = e => {
      settingsStore.setMirroredY(e.detail.value)
    }

    const onDisplayReadingIndicatorBoxesChange = e => {
      settingsStore.setDisplayReadingIndicatorBoxes(e.detail.value)
    }

    const onReadingIndicatorBoxesHeightChange = e => {
      settingsStore.setReadingIndicatorBoxesHeight(e.detail.value)
    }

    const onSideMarginChange = e => {
      settingsStore.setSideMargin(e.detail.value)
    }

    const onCountdownDurationChange = e => {
      settingsStore.setCountdownDuration(e.detail.value)
    }

    const resetSettings = () => {
      settingsStore.resetSettings()
    }

    return {
      settings,
      languages,
      currentLanguageIndex,
      alignments,
      currentAlignmentIndex,
      fonts,
      currentFontIndex,
      onLanguageChange,
      onScrollSpeedChange,
      onFontSizeChange,
      onAlignmentChange,
      onFontChange,
      onMirroredXChange,
      onMirroredYChange,
      onDisplayReadingIndicatorBoxesChange,
      onReadingIndicatorBoxesHeightChange,
      onSideMarginChange,
      onCountdownDurationChange,
      resetSettings
    }
  }
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
