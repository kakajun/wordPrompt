from fastapi import Depends
from sqlalchemy.orm import Session
from entity.database import get_session
from dto.schemas import Address, AddressCreate
from common.router import APIRouterPro
from common.vo import DataResponseModel, CrudResponseModel
from service.address_service import AddressService

router = APIRouterPro(prefix="/addresses", tags=["addresses"], order_num=101)


@router.post("/users/{user_id}", summary='为用户创建地址接口',
             description='用于为用户创建地址', response_model=DataResponseModel[Address])
def create_address_endpoint(user_id: int, address: AddressCreate, session: Session = Depends(get_session)):
    return AddressService.create_address(user_id, address, session)


@router.get("/users/{user_id}", summary='获取用户所有地址接口',
            description='用于获取用户所有地址', response_model=DataResponseModel[list[Address]])
@router.get("/users/{user_id}", response_model=DataResponseModel[list[Address]])
def list_addresses_endpoint(user_id: int, session: Session = Depends(get_session)):
    return AddressService.list_addresses(user_id, session)


@router.get("/{address_id}", summary='获取指定地址接口',
            description='用于获取指定地址', response_model=DataResponseModel[Address])
@router.get("/{address_id}", response_model=DataResponseModel[Address])
def get_address_endpoint(address_id: int, session: Session = Depends(get_session)):
    return AddressService.get_address(address_id, session)


@router.delete("/{address_id}", summary='删除地址接口',
               description='用于删除地址', response_model=CrudResponseModel)
@router.delete("/{address_id}", response_model=CrudResponseModel)
def delete_address_endpoint(address_id: int, session: Session = Depends(get_session)):
    return AddressService.delete_address(address_id, session)
