import { validate, v4 as uuidv4 } from 'uuid'

export function createUuid() {
  return uuidv4()
}

export function isValidUuid(value) {
  return typeof value === 'string' && validate(value)
}
