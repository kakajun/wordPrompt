from typing import List
from sqlalchemy.orm import Session

from entity.models import User as UserModel, Address as AddressModel
from dto.schemas import Address, AddressCreate
from common.vo import DataResponseModel, CrudResponseModel


class AddressService:
    @staticmethod
    def create_address(user_id: int, address: AddressCreate, session: Session) -> DataResponseModel[Address]:
        """为用户创建地址"""
        try:
            user = session.query(UserModel).filter(
                UserModel.id == user_id).first()
            if user is None:
                return DataResponseModel[Address](code=404, msg="用户不存在", success=False, data=None)

            # 使用 Pydantic 验证后的数据
            db_address = AddressModel(
                email_address=address.email_address, user_id=user_id)
            session.add(db_address)
            session.commit()
            session.refresh(db_address)
            return DataResponseModel[Address](data=db_address)
        except Exception as e:
            session.rollback()
            return DataResponseModel[Address](code=500, msg=f"创建地址失败: {str(e)}", success=False, data=None)

    @staticmethod
    def get_address(address_id: int, session: Session) -> DataResponseModel[Address]:
        """获取指定地址"""
        try:
            address = session.query(AddressModel).filter(
                AddressModel.id == address_id).first()
            if address is None:
                return DataResponseModel[Address](code=404, msg="地址不存在", success=False, data=None)
            return DataResponseModel[Address](data=address)
        except Exception as e:
            return DataResponseModel[Address](code=500, msg=f"获取地址失败: {str(e)}", success=False, data=None)

    @staticmethod
    def list_addresses(user_id: int, session: Session) -> DataResponseModel[List[Address]]:
        """获取用户的所有地址"""
        try:
            user = session.query(UserModel).filter(
                UserModel.id == user_id).first()
            if user is None:
                return DataResponseModel[List[Address]](code=404, msg="用户不存在", success=False, data=None)

            addresses = session.query(AddressModel).filter(
                AddressModel.user_id == user_id).all()
            return DataResponseModel[List[Address]](data=addresses)
        except Exception as e:
            return DataResponseModel[List[Address]](code=500, msg=f"获取地址列表失败: {str(e)}", success=False, data=None)

    @staticmethod
    def delete_address(address_id: int, session: Session) -> CrudResponseModel:
        """删除地址"""
        try:
            address = session.query(AddressModel).filter(
                AddressModel.id == address_id).first()
            if address is None:
                return CrudResponseModel(is_success=False, message="地址不存在", result=None)

            session.delete(address)
            session.commit()
            return CrudResponseModel(is_success=True, message="地址已删除", result={"address_id": address_id})
        except Exception as e:
            session.rollback()
            return CrudResponseModel(is_success=False, message=f"删除地址失败: {str(e)}", result=None)
