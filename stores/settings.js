import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    scrollSpeed: 10,
    fontSize: 40,
    alignment: 'center',
    fontFamily: 'Microsoft YaHei',
    mirroredX: false,
    mirroredY: false,
    displayReadingIndicatorBoxes: true,
    readingIndicatorBoxesHeight: 50,
    sideMargin: 0,
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

    setDisplayReadingIndicatorBoxes(display) {
      this.displayReadingIndicatorBoxes = display
    },

    setReadingIndicatorBoxesHeight(height) {
      this.readingIndicatorBoxesHeight = height
    },

    setSideMargin(margin) {
      this.sideMargin = margin
    },

    setCountdownDuration(duration) {
      this.countdownDuration = duration
    },

    resetSettings() {
      this.$reset()
    }
  }
})
