from typing import Optional
from sqlalchemy import String, DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from datetime import datetime


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "user_account"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    fullname: Mapped[Optional[str]] = mapped_column(String(50), default=None)
    password_salt: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    password_hash: Mapped[Optional[str]] = mapped_column(String(128), nullable=True)

    create_time: Mapped[Optional[datetime]] = mapped_column(
        DateTime, default=datetime.now, comment='创建时间')

    update_time: Mapped[Optional[datetime]] = mapped_column(
        DateTime, nullable=True, comment='更新时间')

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, name={self.name!r}, fullname={self.fullname!r} , create_time={self.create_time!r}, update_time={self.update_time!r})"
