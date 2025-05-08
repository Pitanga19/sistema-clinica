from sqlalchemy import Column, BigInteger, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class User(Base):
    id = Column(BigInteger, primary_key=True, index=True)
    role_id = Column(BigInteger, ForeignKey("role.id"), nullable=False)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    
    # Relaciones
    role = relationship('Role', back_populates='users')
