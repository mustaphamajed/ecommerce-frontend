export type Permission =
  | 'product:read'
  | 'product:write'
  | 'stock:read'
  | 'stock:adjust'
  | 'user:read'
  | 'user:manage'
  | 'role:manage'
  | 'audit:read'
  | 'system:monitor'

export type CurrentUser = {
  id: number
  email: string
  firstName: string
  lastName: string
  roles: string[]
  permissions: Permission[]
  warehouseIds: number[]
}

export type TokenResponse = {
  accessToken: string
  tokenType: 'Bearer'
  expiresIn: number
}

export type AuthStatus = 'loading' | 'authenticated' | 'anonymous'
