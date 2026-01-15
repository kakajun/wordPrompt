from common.router import APIRouterPro
from common.vo import DataResponseModel
from dto.schemas import AlignRequest, AlignResponse

router = APIRouterPro(prefix="/api", tags=["align"], order_num=52)

@router.post("/align", summary="文本对齐", response_model=DataResponseModel[AlignResponse])
async def align(req: AlignRequest):
    idx = req.script.find(req.speechSegment.strip())
    score = 1.0 if idx >= 0 else 0.0
    return DataResponseModel[AlignResponse](data=AlignResponse(scriptIndex=idx if idx >= 0 else 0, score=score))
