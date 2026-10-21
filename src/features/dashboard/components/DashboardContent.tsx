import { EmptyState } from '@/components/ui'
import type { Dashboard } from '../types'
import { DashboardStats } from './DashboardStats'
import { RecentMovements } from './RecentMovements'
import { WarehouseHealthList } from './WarehouseHealthList'

type DashboardContentProps = {
  dashboard: Dashboard
}

export function DashboardContent({ dashboard }: DashboardContentProps) {
  const hasAnySection = dashboard.catalog !== null || dashboard.stock !== null || dashboard.users !== null

  return hasAnySection ? (
    <div className="flex flex-col gap-6">
      <DashboardStats dashboard={dashboard} />
      {dashboard.stock && (
        <div className="grid gap-6 lg:grid-cols-2">
          <WarehouseHealthList
            warehouses={dashboard.stock.warehouses}
            lowStockThreshold={dashboard.stock.lowStockThreshold}
          />
          <RecentMovements movements={dashboard.stock.recentMovements} />
        </div>
      )}
    </div>
  ) : (
    <EmptyState title="Nothing to show yet" description="Your role doesn't include any dashboard section." />
  )
}
