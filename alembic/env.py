from logging.config import fileConfig
from sqlalchemy.ext.asyncio import async_engine_from_config
import asyncio
from sqlalchemy import pool
from alembic import context
import os
from dotenv import load_dotenv
from app.db.base_class import Base

from app.db.tables.users.model import User
from app.db.tables.role_assignments.model import RoleAssignment
from app.db.tables.roles.model import Role
from app.db.tables.assignments.model import Assignment
from app.db.tables.professionals.model import Professional
from app.db.tables.entities.model import Entity
from app.db.tables.plans.model import Plan
from app.db.tables.persons.model import Person
from app.db.tables.patients.model import Patient

load_dotenv()
config = context.config
config.set_main_option('sqlalchemy.url', os.environ.get('DATABASE_URL'))

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata

def run_migrations_offline() -> None:
    url = config.get_main_option('sqlalchemy.url')
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={'paramstyle': 'named'},
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection):
    context.configure(
        connection=connection,
        target_metadata=target_metadata
    )
    
    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online() -> None:
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix='sqlalchemy.',
        poolclass=pool.NullPool,
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)
    
    await connectable.dispose()


if context.is_offline_mode():
    run_migrations_offline()
else:
    asyncio.run(run_migrations_online())
