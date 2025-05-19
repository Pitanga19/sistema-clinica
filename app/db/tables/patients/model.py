from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base_class import Base

class Patient(Base):
    __tablename__ = 'patients'
    __table_args__ = {'extend_existing': True}
    
    id: Mapped[int] = mapped_column(primary_key=True)
    clinical_history_number: Mapped[int] = mapped_column(Integer, index=True, unique=True, nullable=False)
    entity_code: Mapped[str] = mapped_column(String, nullable=False)
    plan_id: Mapped[int] = mapped_column(Integer,ForeignKey('plans.id', name='plan_id'), index=True, nullable=False)
    person_id: Mapped[int] = mapped_column(Integer,ForeignKey('persons.id', name='patient_person_id', ondelete='CASCADE'), unique=True, nullable=False)
    
    # Relaciones
    plan = relationship('Plan', back_populates='patients')
    person = relationship('Person', back_populates='patient')
    evaluations = relationship('Evaluation', back_populates='patient')
