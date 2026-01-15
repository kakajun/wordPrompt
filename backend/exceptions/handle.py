from fastapi import FastAPI, Request, Response
from fastapi.exceptions import HTTPException, RequestValidationError
from pydantic_validation_decorator import FieldValidationError

from exceptions.exception import (
    AuthException,
    LoginException,
    ModelValidatorException,
    PermissionException,
    ServiceException,
    ServiceWarning,
)
from utils.log_util import logger
from utils.response_util import JSONResponse, ResponseUtil, jsonable_encoder


def handle_exception(app: FastAPI) -> None:
    """
    全局异常处理
    """

    # 自定义token检验异常
    @app.exception_handler(AuthException)
    async def auth_exception_handler(request: Request, exc: AuthException) -> Response:
        return ResponseUtil.unauthorized(data=exc.data, msg=exc.message)

    # 自定义登录检验异常
    @app.exception_handler(LoginException)
    async def login_exception_handler(request: Request, exc: LoginException) -> Response:
        return ResponseUtil.failure(data=exc.data, msg=exc.message)

    # 自定义模型检验异常
    @app.exception_handler(ModelValidatorException)
    async def model_validator_exception_handler(request: Request, exc: ModelValidatorException) -> Response:
        logger.warning(exc.message)
        return ResponseUtil.failure(data=exc.data, msg=exc.message)

    # 自定义字段检验异常
    @app.exception_handler(FieldValidationError)
    async def field_validation_error_handler(request: Request, exc: FieldValidationError) -> Response:
        logger.warning(exc.message)
        return ResponseUtil.failure(msg=exc.message)

    # 自定义权限检验异常
    @app.exception_handler(PermissionException)
    async def permission_exception_handler(request: Request, exc: PermissionException) -> Response:
        return ResponseUtil.forbidden(data=exc.data, msg=exc.message)

    # 自定义服务异常
    @app.exception_handler(ServiceException)
    async def service_exception_handler(request: Request, exc: ServiceException) -> Response:
        logger.error(exc.message)
        return ResponseUtil.error(data=exc.data, msg=exc.message)

    # 自定义服务警告
    @app.exception_handler(ServiceWarning)
    async def service_warning_handler(request: Request, exc: ServiceWarning) -> Response:
        logger.warning(exc.message)
        return ResponseUtil.failure(data=exc.data, msg=exc.message)

    # 处理其他http请求异常
    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException) -> Response:
        return JSONResponse(
            content=jsonable_encoder({'code': exc.status_code, 'msg': exc.detail}), status_code=exc.status_code
        )

    # 处理Pydantic请求体验证异常
    @app.exception_handler(RequestValidationError)
    async def request_validation_exception_handler(request: Request, exc: RequestValidationError) -> Response:
        from common.constant import HttpStatusConstant
        logger.warning(f"请求验证失败: {exc}")
        errors = []
        for error in exc.errors():
            errors.append({
                'field': '.'.join(str(x) for x in error['loc'][1:]),
                'message': error['msg']
            })
        result = {
            'code': HttpStatusConstant.BAD_REQUEST,
            'msg': '请求参数验证失败',
            'success': False,
            'data': errors
        }
        from datetime import datetime
        result['time'] = datetime.now()
        return JSONResponse(
            status_code=HttpStatusConstant.BAD_REQUEST,
            content=jsonable_encoder(result)
        )

    # 处理其他异常
    @app.exception_handler(Exception)
    async def exception_handler(request: Request, exc: Exception) -> Response:
        logger.exception(exc)
        return ResponseUtil.error(msg=str(exc))
