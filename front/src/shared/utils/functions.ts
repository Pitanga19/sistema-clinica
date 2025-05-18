import type { PropType } from './types'

export const booleanToString = (value: boolean): string => (value ? 'Sí' : 'No')

export const handleOptionalProp = (value: PropType): string => {
    return value !== null && value !== undefined ? value.toString() : 'Sin registro'
}

export const handleUpdateData = <T extends object>(data: T, defaultData: T): Partial<T> => {
    const result: Partial<T> = {}

    for (const key in data) {
        if (data[key] !== defaultData[key]) {
            result[key] = data[key]
        }
    }

    return result
}
