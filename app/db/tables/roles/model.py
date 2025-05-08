from sqlalchemy import Table, Column, Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base_class import Base

role_assignment = Table('role_assignment', Base.metadata,
    Column('role_id', Integer, ForeignKey('role.id'), primary_key=True),
    Column('assignment_id', Integer, ForeignKey('assignment.id'), primary_key=True)
)

class Role(Base):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    
    # Relaciones
    users = relationship('User', back_populates='role')
    assignments = relationship('Assignment', secondary=role_assignment, back_populates='roles')
