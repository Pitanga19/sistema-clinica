import camelcaseKeys from 'camelcase-keys'
import decamelize from 'decamelize'

type CamelInput = Record<string, unknown> | readonly Record<string, unknown>[]

export function toCamel<T>(data: CamelInput): T {
    return camelcaseKeys(data, { deep: true }) as T
}

export function toSnake<T extends object>(data: T): unknown {
    const convert = (obj: unknown): unknown => {
        if (Array.isArray(obj)) {
            return obj.map(convert)
        } else if (obj !== null && typeof obj === 'object') {
            return Object.fromEntries(
                Object.entries(obj).map(([key, value]) => [
                    fixSnakeKey(key),
                    convert(value),
                ])
            )
        }
        return obj
    }

    const fixSnakeKey = (key: string) =>
        decamelize(key.replace(/(\d+)/g, '_$1'))

    return convert(data)
}
