from sqlalchemy import Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base_class import Base

class Plan(Base):
    __tablename__ = 'plans'
    __table_args__ = (
        UniqueConstraint('name', 'entity_id', name='uq_plan_name_entity_id'),
        {'extend_existing': True}
    )
    
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    entity_id: Mapped[int] = mapped_column(Integer, ForeignKey('entities.id', name='plan_entity_id', ondelete='CASCADE'), index=True, nullable=False)
    
    # Relaciones
    entity = relationship('Entity', back_populates='plans')
    patients = relationship('Patient', back_populates='plan')
