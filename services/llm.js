export async function rewrite({ baseUrl, text, tone, style, length }) {
  const res = await uni.request({
    url: `${baseUrl}/api/llm/rewrite`,
    method: 'POST',
    data: { text, tone, style, length },
    header: { 'Content-Type': 'application/json' }
  })
  const data = res.data || {}
  return data.rewrittenText || ''
}

export async function keywords({ baseUrl, text, density = 'med', mode = 'topics' }) {
  const res = await uni.request({
    url: `${baseUrl}/api/llm/keywords`,
    method: 'POST',
    data: { text, density, mode },
    header: { 'Content-Type': 'application/json' }
  })
  const data = res.data || {}
  return data.keywords || []
}
