import { defineStore } from 'pinia'
import { text } from './mock'
export const useScriptStore = defineStore('script', {
  state: () => ({
    text: text,
    title: '',
    id: null,
    createdAt: null
  }),

  actions: {
    setText(text) {
      this.text = text
    },

    setTitle(title) {
      this.title = title
    },

    async saveScript() {
      try {
        const scripts = await this.getScripts()
        const newScript = {
          id: Date.now().toString(),
          title: this.title || 'Untitled',
          text: this.text,
          createdAt: new Date().toISOString()
        }

        scripts.push(newScript)
        uni.setStorageSync('scripts', JSON.stringify(scripts))
        return newScript
      } catch (error) {
        console.error('Error saving script:', error)
        throw error
      }
    },

    async getScripts() {
      try {
        const scriptsStr = uni.getStorageSync('scripts')
        return scriptsStr ? JSON.parse(scriptsStr) : []
      } catch (error) {
        console.error('Error getting scripts:', error)
        return []
      }
    },

    async loadScript(scriptId) {
      try {
        const scripts = await this.getScripts()
        const script = scripts.find(s => s.id === scriptId)
        if (script) {
          this.text = script.text
          this.title = script.title
          this.id = script.id
          this.createdAt = script.createdAt
          return script.text
        }
        return ''
      } catch (error) {
        console.error('Error loading script:', error)
        return ''
      }
    },

    async deleteScript(scriptId) {
      try {
        const scripts = await this.getScripts()
        const updatedScripts = scripts.filter(s => s.id !== scriptId)
        uni.setStorageSync('scripts', JSON.stringify(updatedScripts))
      } catch (error) {
        console.error('Error deleting script:', error)
        throw error
      }
    }
  }
})
