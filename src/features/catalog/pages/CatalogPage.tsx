import { Pagination, SearchInput } from '@/components/ui'
import { CatalogResults } from '../components/CatalogResults'
import { CategoryFilter } from '../components/CategoryFilter'
import { useCatalogCategories } from '../hooks/useCatalogCategories'
import { useCatalogFilters } from '../hooks/useCatalogFilters'
import { useCatalogProducts } from '../hooks/useCatalogProducts'

export function CatalogPage() {
  const filters = useCatalogFilters()
  const productsQuery = useCatalogProducts({ query: filters.query, category: filters.category, page: filters.page })
  const categoriesQuery = useCatalogCategories()

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Our products</h1>
          <p className="mt-1 text-sm text-slate-500">Browse the catalog and find what you need.</p>
        </div>
        <SearchInput
          query={filters.query}
          onSearch={filters.setQuery}
          label="Search products"
          placeholder="Search by name or SKU"
        />
      </div>

      <CategoryFilter
        categories={categoriesQuery.data ?? []}
        selected={filters.category}
        onSelect={filters.setCategory}
      />

      <CatalogResults
        products={productsQuery.data?.content ?? []}
        isLoading={productsQuery.isPending}
        isError={productsQuery.isError}
        hasFilters={filters.hasFilters}
        onClearFilters={filters.clear}
        onRetry={() => productsQuery.refetch()}
      />

      <Pagination
        page={filters.page}
        totalPages={productsQuery.data?.totalPages ?? 0}
        onPageChange={filters.setPage}
      />
    </div>
  )
}
