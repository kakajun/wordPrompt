from typing import List
from sqlalchemy.orm import Session
from datetime import datetime
from entity.models import User as UserModel
from dto.schemas import User, UserCreate, UserRegister, UserLogin, AuthResponse
from common.vo import DataResponseModel, CrudResponseModel
from utils.auth_util import hash_password, verify_password, make_token


class UserService:
    @staticmethod
    def create_user(user: UserCreate, session: Session) -> DataResponseModel[User]:
        """创建新用户"""
        try:
            db_user = UserModel(name=user.name, fullname=user.fullname)
            session.add(db_user)
            session.commit()
            session.refresh(db_user)
            return DataResponseModel[User](data=db_user)
        except Exception as e:
            session.rollback()
            return DataResponseModel[User](code=500, msg=f"创建用户失败: {str(e)}", success=False, data=None)

    @staticmethod
    def get_user(user_id: int, session: Session) -> DataResponseModel[User]:
        """获取指定用户"""
        try:
            user = session.query(UserModel).filter(
                UserModel.id == user_id).first()
            if user is None:
                return DataResponseModel[User](code=404, msg="用户不存在", success=False, data=None)
            return DataResponseModel[User](data=user)
        except Exception as e:
            return DataResponseModel[User](code=500, msg=f"获取用户失败: {str(e)}", success=False, data=None)

    @staticmethod
    def list_users(session: Session) -> DataResponseModel[List[User]]:
        """获取所有用户"""
        try:
            users = session.query(UserModel).all()
            return DataResponseModel[List[User]](data=users)
        except Exception as e:
            return DataResponseModel[List[User]](code=500, msg=f"获取用户列表失败: {str(e)}", success=False, data=None)

    @staticmethod
    def update_user(user_id: int, user: UserCreate, session: Session) -> DataResponseModel[User]:
        """更新用户信息"""
        try:
            db_user = session.query(UserModel).filter(
                UserModel.id == user_id).first()
            if db_user is None:
                return DataResponseModel[User](code=404, msg="用户不存在", success=False, data=None)

            # 使用 Pydantic 验证后的数据
            db_user.name = user.name
            db_user.fullname = user.fullname
            db_user.update_time = datetime.now()
            session.commit()
            session.refresh(db_user)
            return DataResponseModel[User](data=db_user)
        except Exception as e:
            session.rollback()
            return DataResponseModel[User](code=500, msg=f"更新用户失败: {str(e)}", success=False, data=None)

    @staticmethod
    def delete_user(user_id: int, session: Session) -> CrudResponseModel:
        """删除用户"""
        try:
            db_user = session.query(UserModel).filter(
                UserModel.id == user_id).first()
            if db_user is None:
                return CrudResponseModel(is_success=False, message="用户不存在", result=None)

            session.delete(db_user)
            session.commit()
            return CrudResponseModel(is_success=True, message="用户已删除", result={"user_id": user_id})
        except Exception as e:
            session.rollback()
            return CrudResponseModel(is_success=False, message=f"删除用户失败: {str(e)}", result=None)

    @staticmethod
    def register(user: UserRegister, session: Session) -> DataResponseModel[AuthResponse]:
        try:
            exists = session.query(UserModel).filter(UserModel.name == user.name).first()
            if exists is not None:
                return DataResponseModel[AuthResponse](code=400, msg="用户名已存在", success=False, data=None)
            salt, hashed = hash_password(user.password)
            db_user = UserModel(name=user.name, fullname=user.fullname, password_salt=salt, password_hash=hashed)
            session.add(db_user)
            session.commit()
            session.refresh(db_user)
            token = make_token(db_user.name)
            return DataResponseModel[AuthResponse](data=AuthResponse(token=token))
        except Exception as e:
            session.rollback()
            return DataResponseModel[AuthResponse](code=500, msg=f"注册失败: {str(e)}", success=False, data=None)

    @staticmethod
    def login(user: UserLogin, session: Session) -> DataResponseModel[AuthResponse]:
        try:
            db_user = session.query(UserModel).filter(UserModel.name == user.name).first()
            if db_user is None or db_user.password_salt is None or db_user.password_hash is None:
                return DataResponseModel[AuthResponse](code=401, msg="用户名或密码错误", success=False, data=None)
            if not verify_password(user.password, db_user.password_salt, db_user.password_hash):
                return DataResponseModel[AuthResponse](code=401, msg="用户名或密码错误", success=False, data=None)
            token = make_token(db_user.name)
            return DataResponseModel[AuthResponse](data=AuthResponse(token=token))
        except Exception as e:
            return DataResponseModel[AuthResponse](code=500, msg=f"登录失败: {str(e)}", success=False, data=None)
