from sqlalchemy import Text, Integer, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base_class import Base
from datetime import datetime

class Evaluation(Base):
    __tablename__ = 'evaluations'
    __table_args__ = {'extend_existing': True}
    
    id: Mapped[int] = mapped_column(primary_key=True)
    report: Mapped[str] = mapped_column(Text)
    closed_at: Mapped[datetime] = mapped_column(DateTime, index=True, nullable=True)
    patient_id: Mapped[int] = mapped_column(Integer,ForeignKey('patients.id', name='evaluation_patient_id'), index=True, nullable=False)
    professional_id: Mapped[int] = mapped_column(Integer,ForeignKey('professionals.id', name='evaluation_professional_id'), index=True, nullable=False)
    mode_id: Mapped[int] = mapped_column(Integer,ForeignKey('modes.id', name='evaluation_mode_id'), index=True, nullable=False)
    
    # Relaciones
    patient = relationship('Patient', back_populates='evaluations')
    professional = relationship('Professional', back_populates='evaluations')
    mode = relationship('Mode', back_populates='evaluations')
