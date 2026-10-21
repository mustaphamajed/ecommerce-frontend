import { useAuth } from '@/features/auth'

const ADMIN_ROLE = 'ADMIN'

export function useWarehouseAccess() {
  const { user, hasPermission } = useAuth()
  const isAdmin = user?.roles.includes(ADMIN_ROLE) ?? false
  const assignedWarehouseIds = user?.warehouseIds ?? []

  return {
    assignedWarehouseIds,
    canAdjust: (warehouseId: number) =>
      hasPermission('stock:adjust') && (isAdmin || assignedWarehouseIds.includes(warehouseId)),
  }
}
