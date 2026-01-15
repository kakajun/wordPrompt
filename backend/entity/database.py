from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from .models import Base

# 使用SQLite数据库进行本地开发
DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, echo=True,
                       pool_pre_ping=True, pool_recycle=3600)


def create_tables():
    """创建数据库表"""
    Base.metadata.create_all(engine)


def get_session():
    """获取数据库会话"""
    with Session(engine) as session:
        yield session
