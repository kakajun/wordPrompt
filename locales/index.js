//引入配置文件
import { createI18n } from "vue-i18n"; //引入vue-1i8n
import en from './en.json';   // 英文
import zhHans from './zh.json';  // 中文

  // 初始化国际化配置
  const messages = {
    legacy: false,
   'en-US':en,
		'zh-CN':zhHans
  }

  const i18n = createI18n({
    locale: uni.getStorageSync('locale') || 'zh-CN',
    messages
  })

//导出配置
export default i18n
