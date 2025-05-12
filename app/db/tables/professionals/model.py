from sqlalchemy import Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base_class import Base

class Professional(Base):
    __tablename__ = 'professionals'
    __table_args__ = {'extend_existing': True}
    
    id: Mapped[int] = mapped_column(primary_key=True)
    signature: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    national_registration: Mapped[int] = mapped_column(Integer, unique=True, nullable=True)
    provincial_registration: Mapped[int] = mapped_column(Integer, unique=True, nullable=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id', name='professional_user_id', ondelete='CASCADE'), unique=True, index=True, nullable=False)
    
    # Relaciones
    user = relationship('User', back_populates='professional')
