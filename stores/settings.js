import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    scrollSpeed: 10,
    fontSize: 40,
    alignment: 'center',
    fontFamily: 'Microsoft YaHei',
    mirroredX: false,
    mirroredY: false,
    sideMargin: 4,
    lineHeightRate: 1.5,
    countdownDuration: 3
  }),

  actions: {
    setScrollSpeed(speed) {
      this.scrollSpeed = speed
    },

    setFontSize(size) {
      this.fontSize = size
    },

    setAlignment(alignment) {
      this.alignment = alignment
    },

    setFontFamily(family) {
      this.fontFamily = family
    },

    setMirroredX(mirrored) {
      this.mirroredX = mirrored
    },

    setMirroredY(mirrored) {
      this.mirroredY = mirrored
    },

    setSideMargin(margin) {
      this.sideMargin = margin
    },

    setCountdownDuration(duration) {
      this.countdownDuration = duration
    },

    setCountdownLineHeight(f) {
      this.lineHeightRate = f
    },

    resetSettings() {
      this.$reset()
    }
  }
})
