import type { PropType } from "./types"

export const booleanToString = (value: boolean): string => value ? 'Sí' : 'No'

export const handleOptionalProp = (value: PropType): string => {
    return (value !== null) ? value.toString() : 'Sin registro'
}
