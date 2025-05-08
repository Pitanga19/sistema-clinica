from sqlalchemy import Table, Column, BigInteger, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base_class import Base

role_assignment = Table('role_assignment', Base.metadata,
    Column('role_id', BigInteger, ForeignKey('role.id'), primary_key=True),
    Column('assignment_id', BigInteger, ForeignKey('assignment.id'), primary_key=True)
)

class Role(Base):
    id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    
    # Relaciones
    users = relationship('User', back_populates='role')
    assignments = relationship('Assignment', secondary=role_assignment, back_populates='roles')