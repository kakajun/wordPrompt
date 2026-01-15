from common.router import APIRouterPro
from common.vo import DataResponseModel
from dto.schemas import RewriteRequest, RewriteResponse, KeywordsRequest, KeywordsResponse

router = APIRouterPro(prefix="/api/llm", tags=["llm"], order_num=51)

@router.post("/rewrite", summary="AI重写", response_model=DataResponseModel[RewriteResponse])
async def llm_rewrite(req: RewriteRequest):
    text = req.text.strip()
    if not text:
        return DataResponseModel[RewriteResponse](data=RewriteResponse(rewrittenText=""))
    rewritten = text
    return DataResponseModel[RewriteResponse](data=RewriteResponse(rewrittenText=rewritten, notes="mock"))

@router.post("/keywords", summary="关键词提取", response_model=DataResponseModel[KeywordsResponse])
async def llm_keywords(req: KeywordsRequest):
    text = req.text.strip()
    if not text:
        return DataResponseModel[KeywordsResponse](data=KeywordsResponse(keywords=[]))
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
    return DataResponseModel[KeywordsResponse](data=KeywordsResponse(keywords=uniq[:20]))
