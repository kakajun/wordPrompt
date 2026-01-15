from typing import Optional
import asyncio
from fastapi import UploadFile, File, Form, WebSocket
from common.router import APIRouterPro
from common.vo import DataResponseModel
from dto.schemas import STTResponse

router = APIRouterPro(prefix="/api", tags=["stt"], order_num=50)

@router.post("/stt", summary="语音转文字", response_model=DataResponseModel[STTResponse])
async def stt(audio: UploadFile = File(...), language: Optional[str] = Form(None), sampleRate: Optional[int] = Form(None)):
    data = await audio.read()
    if not data:
        return DataResponseModel[STTResponse](data=STTResponse(text="", confidence=0.0))
    return DataResponseModel[STTResponse](data=STTResponse(text="语音识别结果", confidence=0.5))

@router.websocket("/stt/stream")
async def stt_stream(ws: WebSocket):
    await ws.accept()
    try:
        while True:
            await ws.receive_bytes()
            await asyncio.sleep(0.05)
            await ws.send_json({"type": "partial", "text": "部分识别", "confidence": 0.5})
    except Exception:
        await ws.close()
