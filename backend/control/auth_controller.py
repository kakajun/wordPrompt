from fastapi import Depends
from sqlalchemy.orm import Session
from entity.database import get_session
from common.router import APIRouterPro
from common.vo import DataResponseModel
from dto.schemas import UserRegister, UserLogin, AuthResponse
from service.user_service import UserService

router = APIRouterPro(prefix="/auth", tags=["auth"], order_num=10)

@router.post("/register", summary="用户注册", response_model=DataResponseModel[AuthResponse])
def register(user: UserRegister, session: Session = Depends(get_session)):
    return UserService.register(user, session)

@router.post("/login", summary="用户登录", response_model=DataResponseModel[AuthResponse])
def login(user: UserLogin, session: Session = Depends(get_session)):
    return UserService.login(user, session)
