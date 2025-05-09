from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.db.utils import crud as utils
from app.db.tables.role_assignments.model import RoleAssignment
from app.db.tables.role_assignments.schemas import *
from app.db.tables.roles.crud import get_by_id as get_role_by_id
from app.db.tables.assignments.crud import get_by_id as get_assignment_by_id

async def create(data: RoleAssignmentCreate, db: AsyncSession) -> RoleAssignment | None:
    await get_role_by_id(data.role_id, db)
    await get_assignment_by_id(data.assignment_id, db)
    
    should_exist = False
    search_fields = [
        utils.SearchField(field='role_id', value=data.role_id),
        utils.SearchField(field='assignment_id', value=data.assignment_id)
    ]
    
    stmt = select(RoleAssignment).where(
        (RoleAssignment.role_id == data.role_id) &
        (RoleAssignment.assignment_id == data.assignment_id)
    )
    await utils.get_validated(stmt, should_exist, search_fields=search_fields, db=db)
    
    role_assignment = RoleAssignment(
        role_id=data.role_id,
        assignment_id=data.assignment_id
    )
    
    db.add(role_assignment)
    return await utils.commit_and_refresh(role_assignment, db)

async def get_all(db: AsyncSession) -> List[RoleAssignment]:
    return await utils.get_all(RoleAssignment, db)

async def delete(data: RoleAssignmentBase, db: AsyncSession) -> None:
    should_exist = True
    search_fields = [
        utils.SearchField(field='role_id', value=data.role_id),
        utils.SearchField(field='assignment_id', value=data.assignment_id)
    ]
    stmt = select(RoleAssignment).where(
        (RoleAssignment.role_id == data.role_id) &
        (RoleAssignment.assignment_id == data.assignment_id)
    )
    role_assignment = await utils.get_validated(stmt, should_exist, search_fields=search_fields, db=db)
    return await utils.delete(role_assignment, db)
