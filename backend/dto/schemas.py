from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field, field_validator

class AddressBase(BaseModel):
    email_address: EmailStr = Field(..., description="电子邮件地址")

    @field_validator('email_address')
    def validate_email_format(cls, v):
        if '@' not in v:
            raise ValueError('无效的邮箱格式')
        return v.lower()


class AddressCreate(AddressBase):
    pass


class Address(AddressBase):
    id: int
    user_id: int

    model_config = {
        "from_attributes": True,
        "str_strip_whitespace": True,
        "validate_assignment": True
    }


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
    addresses: List[Address] = []

    model_config = {
        "from_attributes": True,
        "str_strip_whitespace": True,
        "validate_assignment": True
    }
