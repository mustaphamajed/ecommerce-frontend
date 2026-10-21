import { Boxes, Package, PackageX, Tags, TriangleAlert, Users } from 'lucide-react'
import { StatCard } from '@/components/ui'
import type { Dashboard } from '../types'

type DashboardStatsProps = {
  dashboard: Dashboard
}

export function DashboardStats({ dashboard }: DashboardStatsProps) {
  const { catalog, stock, users } = dashboard
  const lowStock = stock?.warehouses.reduce((total, warehouse) => total + warehouse.lowStockProducts, 0) ?? 0
  const outOfStock = stock?.warehouses.reduce((total, warehouse) => total + warehouse.outOfStockProducts, 0) ?? 0

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {catalog && (
        <>
          <StatCard
            label="Active products"
            icon={Package}
            value={catalog.activeProducts}
            hint={`${catalog.archivedProducts} archived`}
            to="/admin/products?status=ACTIVE"
          />
          <StatCard label="Categories" icon={Tags} value={catalog.categories} to="/admin/categories" />
        </>
      )}
      {stock && (
        <>
          <StatCard
            label="Units in stock"
            icon={Boxes}
            value={stock.totalUnits}
            hint="All warehouses"
            to="/admin/stock"
          />
          <StatCard
            label="Low stock"
            icon={TriangleAlert}
            value={lowStock}
            hint={`Product × warehouse pairs with ≤ ${stock.lowStockThreshold} units`}
            tone={lowStock > 0 ? 'warning' : 'neutral'}
            to="/admin/stock?low=1"
          />
          <StatCard
            label="Out of stock"
            icon={PackageX}
            value={outOfStock}
            hint="Product × warehouse pairs with 0 units"
            tone={outOfStock > 0 ? 'danger' : 'neutral'}
          />
        </>
      )}
      {users && (
        <StatCard
          label="Active users"
          icon={Users}
          value={users.activeUsers}
          hint={`${users.disabledUsers} disabled`}
          to="/admin/users?status=active"
        />
      )}
    </div>
  )
}
