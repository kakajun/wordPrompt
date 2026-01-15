from fastapi import FastAPI
from entity.database import create_tables
from common.router import auto_register_routers
from exceptions.handle import handle_exception
from middlewares.handle import handle_middleware


async def lifespan(app: FastAPI):
    print(f'⏰️ FastAPI Demo开始启动')
    create_tables()
    print("✅ 数据库表已创建")
    print('\033[92m' + '🚀 http://127.0.0.1:8000/docs 已启动' + '\033[0m')
    yield

# 创建FastAPI应用
app = FastAPI(
    title="SQLAlchemy FastAPI Demo - 模块化架构",
    description="一个基于SQLAlchemy的FastAPI示例项目，使用模块化架构进行开发。",
    version="0.0.1",
    lifespan=lifespan,
)

# 统一异常处理
handle_exception(app)
# 自动注册所有路由
auto_register_routers(app)
# 加载中间件处理方法
handle_middleware(app)

# ============ 根路由 ============


@app.get("/")
def root():
    """根路由 - 应用信息"""
    return {
        "message": "欢迎使用 SQLAlchemy FastAPI Demo - 模块化架构",
        "docs": "/docs",
        "redoc": "/redoc"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
