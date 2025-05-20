from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base_class import Base

class Person(Base):
    __tablename__ = 'persons'
    __table_args__ = {'extend_existing': True}
    
    id: Mapped[int] = mapped_column(primary_key=True)
    dni: Mapped[str] = mapped_column(String, index=True, unique=True, nullable=False)
    first_name: Mapped[str] = mapped_column(String, nullable=False)
    last_name: Mapped[str] = mapped_column(String, index=True, nullable=False)
    phone_1: Mapped[str] = mapped_column(String, nullable=False)
    phone_2: Mapped[str] = mapped_column(String, nullable=True)
    email: Mapped[str] = mapped_column(String, nullable=True)
    address: Mapped[str] = mapped_column(String, nullable=False)
    is_patient: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    
    # Relaciones
    patient = relationship('Patient', back_populates='person', uselist=False, cascade='all, delete-orphan', passive_deletes=True)
