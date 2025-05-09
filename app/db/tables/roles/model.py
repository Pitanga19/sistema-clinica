from sqlalchemy import Table, Column, Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base_class import Base

role_assignments = Table('role_assignments', Base.metadata,
    Column(
        'role_id',
        Integer,
        ForeignKey('roles.id', ondelete='CASCADE', name='role_assignments_role_id'),
        primary_key=True
    ),
    Column(
        'assignment_id',
        Integer,
        ForeignKey('assignments.id', ondelete='CASCADE', name='role_assignments_assignment_id'),
        primary_key=True
    )
)

class Role(Base):
    __tablename__ = 'roles'
    __table_args__ = {'extend_existing': True}
    
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    
    # Relaciones
    users = relationship('User', back_populates='role')
    assignments = relationship('Assignment', secondary=role_assignments, back_populates='roles')
