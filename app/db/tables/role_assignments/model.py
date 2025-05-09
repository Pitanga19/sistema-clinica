from sqlalchemy import Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base_class import Base

class RoleAssignment(Base):
    __tablename__ = 'role_assignments'
    __table_args__ = {'extend_existing': True}

    role_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey(
            'roles.id',
            ondelete='CASCADE',
            name='role_assignments_role_id'
        ),
        primary_key=True
    )
    assignment_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey(
            'assignments.id',
            ondelete='CASCADE',
            name='role_assignments_assignment_id'
        ),
        primary_key=True
    )
    
    # Relaciones
    role = relationship('Role', back_populates='role_assignments', passive_deletes=True)
    assignment = relationship('Assignment', back_populates='role_assignments', passive_deletes=True)
