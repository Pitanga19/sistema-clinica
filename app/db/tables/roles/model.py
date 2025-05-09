from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base_class import Base
from app.db.tables.role_assignments.model import RoleAssignment

class Role(Base):
    __tablename__ = 'roles'
    __table_args__ = {'extend_existing': True}
    
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    
    # Relaciones
    users = relationship('User', back_populates='role')
    role_assignments = relationship('RoleAssignment', back_populates='role', passive_deletes=True)
    assignments = relationship(
        'Assignment',
        secondary='role_assignments',
        viewonly=True,
        back_populates='roles'
    )
