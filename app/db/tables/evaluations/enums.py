import enum

class ModeEnum(str, enum.Enum):
    EXTERNAL = 'EXTERNAL'
    DAY_HOSPITAL = 'DAY_HOSPITAL'
    INTERNMENT = 'INTERNMENT'
