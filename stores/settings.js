import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    scrollSpeed: 15,
    fontSize: 32,
    alignment: 'center',
    fontFamily: 'Roboto',
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
    },

    applySettingsFromPrompter(prompter) {
      this.scrollSpeed = prompter.scrollSpeed
      this.fontSize = prompter.fontSize
      this.alignment = prompter.alignment
      this.fontFamily = prompter.fontFamily
      this.mirroredX = prompter.mirroredX
      this.mirroredY = prompter.mirroredY
      this.displayReadingIndicatorBoxes = prompter.displayReadingIndicatorBoxes
      this.readingIndicatorBoxesHeight = prompter.readingIndicatorBoxesHeight
      this.sideMargin = prompter.sideMargin
      this.countdownDuration = prompter.countdownDuration
    }
  }
})
