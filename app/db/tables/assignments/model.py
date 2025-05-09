from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base_class import Base
from app.db.tables.role_assignments.model import RoleAssignment

class Assignment(Base):
    __tablename__ = 'assignments'
    __table_args__ = {'extend_existing': True}
    
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    
    # Relaciones
    role_assignments = relationship('RoleAssignment', back_populates='assignment', passive_deletes=True)
    roles = relationship(
        'Role',
        secondary='role_assignments',
        viewonly=True,
        back_populates='assignments'
    )
