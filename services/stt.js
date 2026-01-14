let recognition = null

export function hasWebRecognition() {
  return typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
}

export function startWebRecognition({ lang = 'zh-CN', onPartial, onFinal, onError }) {
  const Ctor = window.webkitSpeechRecognition || window.SpeechRecognition
  recognition = new Ctor()
  recognition.lang = lang
  recognition.interimResults = true
  recognition.continuous = true
  recognition.onresult = e => {
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const r = e.results[i][0]
      if (e.results[i].isFinal) {
        onFinal && onFinal(r.transcript || '')
      } else {
        onPartial && onPartial(r.transcript || '')
      }
    }
  }
  recognition.onerror = err => {
    onError && onError(err)
  }
  recognition.start()
}

export function stopWebRecognition() {
  if (recognition) {
    recognition.stop()
    recognition = null
  }
}

export async function uploadStt({ baseUrl, blob, language = 'zh-CN', sampleRate = 16000 }) {
  const form = new FormData()
  form.append('audio', blob, 'speech.webm')
  form.append('language', language)
  form.append('sampleRate', String(sampleRate))
  const res = await uni.request({
    url: `${baseUrl}/api/stt`,
    method: 'POST',
    header: { 'Content-Type': 'multipart/form-data' },
    data: form
  })
  return res.data
}

let socket = null

export function connectStream({ baseUrl, onPartial, onFinal, onError }) {
  socket = uni.connectSocket({ url: `${baseUrl.replace('http', 'ws')}/api/stt/stream` })
  socket.onMessage(msg => {
    try {
      const data = JSON.parse(msg.data)
      if (data.type === 'partial') onPartial && onPartial(data.text || '')
      if (data.type === 'final') onFinal && onFinal(data.text || '')
    } catch (e) {
      onError && onError(e)
    }
  })
  socket.onError(err => onError && onError(err))
}

export function closeStream() {
  if (socket) {
    socket.close()
    socket = null
  }
}
