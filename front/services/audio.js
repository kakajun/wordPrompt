let mediaRecorder = null
let chunks = []

export async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  mediaRecorder = new MediaRecorder(stream)
  chunks = []
  return new Promise(resolve => {
    mediaRecorder.onstart = () => resolve(true)
    mediaRecorder.ondataavailable = e => {
      chunks.push(e.data)
    }
    mediaRecorder.start(200)
  })
}

export async function stopRecording() {
  if (!mediaRecorder) return null
  return new Promise(resolve => {
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' })
      resolve(blob)
    }
    mediaRecorder.stop()
  })
}
