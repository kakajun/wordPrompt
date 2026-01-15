import os
import asyncio
from typing import List, Optional
from fastapi import FastAPI, UploadFile, File, Form, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup():
    host = os.getenv("HOST", "127.0.0.1")
    port = os.getenv("PORT", "8000")
    print(f"Backend running at http://{host}:{port}")


class STTResponse(BaseModel):
    """语音转文字接口的返回结果结构。"""
    text: str
    words: Optional[List[dict]] = None
    confidence: Optional[float] = None


class RewriteRequest(BaseModel):
    """AI 重写接口的请求体。"""
    text: str
    tone: Optional[str] = None
    style: Optional[str] = None
    length: Optional[str] = None


class RewriteResponse(BaseModel):
    """AI 重写接口的返回结果。"""
    rewrittenText: str
    notes: Optional[str] = None


class KeywordsRequest(BaseModel):
    """关键词提取接口的请求体。"""
    text: str
    density: Optional[str] = "med"
    mode: Optional[str] = "topics"


class KeywordsResponse(BaseModel):
    """关键词提取接口的返回结果。"""
    keywords: List[str]


@app.get("/health")
async def health():
    """健康检查接口，用于确认服务是否存活。"""
    return {"status": "ok"}


@app.websocket("/api/stt/stream")
async def stt_stream(ws: WebSocket):
    """流式语音识别接口，通过 WebSocket 持续接收音频并返回部分结果。"""
    await ws.accept()
    try:
        while True:
            chunk = await ws.receive_bytes()
            await asyncio.sleep(0.05)
            await ws.send_json({"type": "partial", "text": "部分识别", "confidence": 0.5})
    except Exception:
        await ws.close()


@app.post("/api/llm/rewrite", response_model=RewriteResponse)
async def llm_rewrite(req: RewriteRequest):
    """调用大模型对原稿进行重写或润色，返回新的稿件文本。"""
    text = req.text.strip()
    if not text:
        return RewriteResponse(rewrittenText="")
    rewritten = text
    return RewriteResponse(rewrittenText=rewritten, notes="mock")


@app.post("/api/llm/keywords", response_model=KeywordsResponse)
async def llm_keywords(req: KeywordsRequest):
    """从稿件文本中抽取关键词，目前为简单本地实现。"""
    text = req.text.strip()
    if not text:
        return KeywordsResponse(keywords=[])
    tokens = []
    for ch in text:
        if ch.isalnum():
            tokens.append(ch)
        else:
            tokens.append(" ")
    s = "".join(tokens)
    parts = [p for p in s.split() if len(p) > 1]
    uniq = []
    for p in parts:
        if p not in uniq:
            uniq.append(p)
    return KeywordsResponse(keywords=uniq[:20])


class AlignRequest(BaseModel):
    """文本对齐接口的请求体。"""
    script: str
    speechSegment: str


class AlignResponse(BaseModel):
    """文本对齐接口的返回结果，给出匹配位置和得分。"""
    scriptIndex: int
    score: float


@app.post("/api/align", response_model=AlignResponse)
async def align(req: AlignRequest):
    """根据语音转写片段在脚本中查找匹配位置，用于智能跟随。"""
    idx = req.script.find(req.speechSegment.strip())
    score = 1.0 if idx >= 0 else 0.0
    return AlignResponse(scriptIndex=idx if idx >= 0 else 0, score=score)
