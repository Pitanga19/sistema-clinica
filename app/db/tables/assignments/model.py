from sqlalchemy import Column, BigInteger, String
from sqlalchemy.orm import relationship
from app.db.base_class import Base
from app.db.tables.roles.model import role_assignment

class Assignment(Base):
    id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    
    # Relaciones
    roles = relationship('Role', secondary='role_assignment', back_populates='assignments')
