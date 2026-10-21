import { Plus } from 'lucide-react'
import { useState } from 'react'
import { ButtonLink, PageHeader, Pagination, SearchInput } from '@/components/ui'
import { useAuth } from '@/features/auth'
import { ArchiveProductDialog } from '../components/ArchiveProductDialog'
import { ProductFilters } from '../components/ProductFilters'
import { ProductsResults } from '../components/ProductsResults'
import { useCategoryOptions } from '../hooks/useCategoryOptions'
import { useProductListParams } from '../hooks/useProductListParams'
import { useProducts } from '../hooks/useProducts'
import { useRestoreProduct } from '../hooks/useRestoreProduct'
import type { Product } from '../types'

export function ProductsPage() {
  const { hasPermission } = useAuth()
  const canWrite = hasPermission('product:write')
  const listParams = useProductListParams()
  const productsQuery = useProducts({
    query: listParams.query,
    categoryId: listParams.categoryId,
    status: listParams.status,
    page: listParams.page,
    sort: listParams.sort,
  })
  const categoriesQuery = useCategoryOptions()
  const restoreProduct = useRestoreProduct()
  const [productToArchive, setProductToArchive] = useState<Product | null>(null)

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Products"
        description="Manage the products shown in your store."
        actions={
          canWrite && (
            <ButtonLink to="/admin/products/new">
              <Plus aria-hidden="true" className="size-4" />
              New product
            </ButtonLink>
          )
        }
      />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <SearchInput
          query={listParams.query}
          onSearch={listParams.setQuery}
          label="Search products"
          placeholder="Search by name or SKU"
        />
        <ProductFilters
          status={listParams.status}
          categoryId={listParams.categoryId}
          categories={categoriesQuery.data ?? []}
          onStatusChange={listParams.setStatus}
          onCategoryChange={listParams.setCategoryId}
        />
      </div>

      <ProductsResults
        products={productsQuery.data?.content ?? []}
        isLoading={productsQuery.isPending}
        isError={productsQuery.isError}
        hasFilters={listParams.hasFilters}
        onClearFilters={listParams.clear}
        onRetry={() => productsQuery.refetch()}
        sort={listParams.sort}
        canWrite={canWrite}
        restoringProductId={restoreProduct.isPending ? (restoreProduct.variables ?? null) : null}
        onSort={listParams.toggleSort}
        onArchive={setProductToArchive}
        onRestore={(product) => restoreProduct.mutate(product.id)}
      />

      <Pagination
        page={listParams.page}
        totalPages={productsQuery.data?.totalPages ?? 0}
        onPageChange={listParams.setPage}
      />

      <ArchiveProductDialog product={productToArchive} onClose={() => setProductToArchive(null)} />
    </section>
  )
}
