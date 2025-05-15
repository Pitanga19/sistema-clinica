import camelcaseKeys from 'camelcase-keys'
import decamelizeKeys from 'decamelize-keys'

type CamelInput = Record<string, unknown> | readonly Record<string, unknown>[]

export function toCamel<T>(data: CamelInput): T {
    return camelcaseKeys(data, { deep: true }) as T
}

export function toSnake<T extends object>(data: T): unknown {
    return decamelizeKeys(data, { deep: true })
}
