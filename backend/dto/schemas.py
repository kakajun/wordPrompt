from typing import List, Optional
from pydantic import BaseModel, Field, field_validator

# ========== User ==========
class UserBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=30,
                      description="用户名，2-30个字符")
    fullname: Optional[str] = Field(
        None, min_length=2, max_length=50, description="全名，可选")

    @field_validator('name')
    def validate_name(cls, v):
        if not v.isalnum():
            raise ValueError('用户名只能包含字母和数字')
        if len(v) < 2:
            raise ValueError('用户名长度至少为2个字符')
        return v.lower()

    @field_validator('fullname')
    def validate_fullname(cls, v):
        if v is not None and len(v.strip()) < 2:
            raise ValueError('全名长度至少为2个字符')
        return v


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int
    model_config = {
        "from_attributes": True,
        "str_strip_whitespace": True,
        "validate_assignment": True
    }

# ========== Auth ==========
class UserRegister(BaseModel):
    name: str = Field(..., min_length=2, max_length=30)
    password: str = Field(..., min_length=6, max_length=128)
    fullname: Optional[str] = None

class UserLogin(BaseModel):
    name: str = Field(..., min_length=2, max_length=30)
    password: str = Field(..., min_length=6, max_length=128)

class AuthResponse(BaseModel):
    token: str

# ========== STT / LLM / Align ==========
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

class AlignRequest(BaseModel):
    script: str
    speechSegment: str

class AlignResponse(BaseModel):
    scriptIndex: int
    score: float
