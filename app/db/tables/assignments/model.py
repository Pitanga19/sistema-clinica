from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base_class import Base
from app.db.tables.roles.model import role_assignment

class Assignment(Base):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    
    # Relaciones
    roles = relationship('Role', secondary='role_assignment', back_populates='assignments')
