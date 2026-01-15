import { defineStore } from 'pinia'

export const useVoiceStore = defineStore('voice', {
  state: () => ({
    enabled: false,
    smartFollow: false,
    language: 'zh-CN',
    ttsRate: 1,
    lastPartial: '',
    anchorIndex: 0,
    speedAdjust: 0
  }),
  actions: {
    setEnabled(v) {
      this.enabled = v
    },
    setSmartFollow(v) {
      this.smartFollow = v
    },
    setLanguage(l) {
      this.language = l
    },
    setTtsRate(r) {
      this.ttsRate = r
    },
    setPartial(t) {
      this.lastPartial = t
    },
    setAnchor(i) {
      this.anchorIndex = i
    },
    setSpeedAdjust(a) {
      this.speedAdjust = a
    }
  }
})
