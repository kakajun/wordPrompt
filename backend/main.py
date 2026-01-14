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


class STTResponse(BaseModel):
    text: str
    words: Optional[List[dict]] = None
    confidence: Optional[float] = None


class RewriteRequest(BaseModel):
    text: str
    tone: Optional[str] = None
    style: Optional[str] = None
    length: Optional[str] = None


class RewriteResponse(BaseModel):
    rewrittenText: str
    notes: Optional[str] = None


class KeywordsRequest(BaseModel):
    text: str
    density: Optional[str] = "med"
    mode: Optional[str] = "topics"


class KeywordsResponse(BaseModel):
    keywords: List[str]


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/api/stt", response_model=STTResponse)
async def stt(
    audio: UploadFile = File(...),
    language: Optional[str] = Form(None),
    sampleRate: Optional[int] = Form(None),
):
    data = await audio.read()
    if not data:
        return STTResponse(text="", confidence=0.0)
    return STTResponse(text="语音识别结果", confidence=0.5)


@app.websocket("/api/stt/stream")
async def stt_stream(ws: WebSocket):
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
    text = req.text.strip()
    if not text:
        return RewriteResponse(rewrittenText="")
    rewritten = text
    return RewriteResponse(rewrittenText=rewritten, notes="mock")


@app.post("/api/llm/keywords", response_model=KeywordsResponse)
async def llm_keywords(req: KeywordsRequest):
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
    script: str
    speechSegment: str


class AlignResponse(BaseModel):
    scriptIndex: int
    score: float


@app.post("/api/align", response_model=AlignResponse)
async def align(req: AlignRequest):
    idx = req.script.find(req.speechSegment.strip())
    score = 1.0 if idx >= 0 else 0.0
    return AlignResponse(scriptIndex=idx if idx >= 0 else 0, score=score)

