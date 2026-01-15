from typing import List
from sqlalchemy.orm import Session
from datetime import datetime
from entity.models import User as UserModel
from dto.schemas import User, UserCreate
from common.vo import DataResponseModel, CrudResponseModel


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
