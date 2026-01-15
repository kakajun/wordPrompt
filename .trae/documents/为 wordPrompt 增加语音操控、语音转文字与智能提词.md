## 总览
- 新增 FastAPI 后端，统一提供 STT（语音转文字）、LLM（重写与关键词）、可选对齐辅助。
- 前端明确页面：编辑稿件、提词板、设置、打开文件、关键词页（共 5 页）。语音操控与智能跟随集成到编辑/提词板，不单独新增页面。

## 前端页面（5）
1. 编辑稿件页（已有）[index.vue](file:///e:/git/wordPrompt/pages/index/index.vue)
   - 新增：录音转文字按钮、AI 重写按钮、录音进度与错误反馈。
2. 提词板页（已有）[prompter.vue](file:///e:/git/wordPrompt/pages/prompter/prompter.vue)
   - 新增：语音操控开关、智能跟随开关与灵敏度；高亮当前匹配行；手动重新对齐。
3. 设置页（已有）[settings.vue](file:///e:/git/wordPrompt/pages/settings/settings.vue)
   - 新增：识别语言、TTS 语速/音色、智能跟随灵敏度、命令词自定义、关键词密度。
4. 打开文件页（已有）[open-file.vue](file:///e:/git/wordPrompt/pages/open-file/open-file.vue)
   - 保持：读取/管理本地文本稿；可加入“导入录音结果”。
5. 关键词页（新增）pages/keywords/keywords.vue（注册到 [pages.json](file:///e:/git/wordPrompt/pages.json)）
   - 展示关键词/关键短语，支持密度与分组；切换原文/关键词模式；复制/导出。

## 后端（FastAPI）
- 技术：FastAPI + Uvicorn，启用 CORS；环境变量管理供应商密钥（不前端硬编码）。
- 依赖建议：fastapi、uvicorn[standard]、pydantic、python-multipart、aiofiles、websockets、faster-whisper（或调用外部 STT/LLM SDK，如 openai 等）、langdetect（可选）。
- 路由设计：
  - POST /api/stt
    - 输入：音频文件（multipart）或 base64；参数：language、sampleRate。
    - 输出：text、words（带时间戳，若可用）、confidence。
  - WS /api/stt/stream
    - 输入：二进制音频帧；输出：流式转写片段（partial/final + 时间戳）。
  - POST /api/llm/rewrite
    - 输入：text、tone/style/length 等；输出：rewrittenText、notes。
  - POST /api/llm/keywords
    - 输入：text、density（low/med/high）、mode（topics/entities/actions）；输出：keywords[]，结构化分组可选。
  - POST /api/align（可选）
    - 输入：script、speechSegment；输出：scriptIndex、score（前端主做对齐，此接口用于增强）。
  - GET /health
- STT 实现：
  - 本地：faster-whisper（small/medium）根据资源选型；或对接外部（Deepgram/Whisper API/Azure）。
  - 返回词级时间戳用于前端滚动对齐。
- LLM 实现：
  - 重写与关键词：封装供应商（OpenAI/Azure/Gemini）；统一提示词与安全裁剪；速率限制。
- 安全：
  - Token 鉴权（Header）；CORS 限域；音频临时存储与清理；日志脱敏。

## 前端集成方式
- H5：优先 Web Speech API（webkitSpeechRecognition）→ 无则走 MediaRecorder 采集 Blob 上传 /api/stt 或 WebSocket。
- App：uni 原生插件实现录音 + STT/TTS，统一通过 services/stt|tts 暴露；与后端保持同一数据结构。
- WebSocket：uni.connectSocket/原生 WebSocket 建连，心跳与断线重连。

## 智能提词跟随（算法）
- 输入：流式转写片段 + 稿子文本。
- 处理：滑窗模糊匹配（编辑距离/LCS + 锚点）定位当前行；根据偏差调整滚速；检测跳段时重定位锚点；高亮当前行。
- 交互：开关+灵敏度；出现低置信度时提示用户手动校准。

## 状态与数据
- 扩展 Pinia：
  - voice store：mic 状态、识别语言、TTS 参数、跟随锚点、滚速修正。
  - script store：稿子版本历史、重写结果、关键词缓存。

## 配置与权限
- H5：麦克风权限；Wake Lock 已在 [prompter.vue](file:///e:/git/wordPrompt/pages/prompter/prompter.vue#L164-L187)。
- App：manifest 增加麦克风权限；统一错误处理与保活。

## 验证与交付
- 前端：页面与交互联调；H5 与 Android 真机测试。
- 后端：接口单测与性能初测；示例环境变量与部署文档（本地 uvicorn / 生产 gunicorn+uvicorn）。

若确认此规划，我将按此拆分任务并开始实施。