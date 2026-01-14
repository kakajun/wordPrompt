export function speak({ text, rate = 1, lang = 'zh-CN' }) {
  const utter = new SpeechSynthesisUtterance(text)
  utter.rate = rate
  utter.lang = lang
  window.speechSynthesis.speak(utter)
}
