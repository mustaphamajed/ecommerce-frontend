import { Plus } from 'lucide-react'
import { useState } from 'react'
import { ButtonLink, PageHeader, Pagination, SearchInput } from '@/components/ui'
import { useAuth } from '@/features/auth'
import { CategoriesResults } from '../components/CategoriesResults'
import { DeleteCategoryDialog } from '../components/DeleteCategoryDialog'
import { useCategories } from '../hooks/useCategories'
import { useCategoryListParams } from '../hooks/useCategoryListParams'
import type { Category } from '../types'

export function CategoriesPage() {
  const { hasPermission } = useAuth()
  const canWrite = hasPermission('product:write')
  const listParams = useCategoryListParams()
  const categoriesQuery = useCategories({ query: listParams.query, page: listParams.page, sort: listParams.sort })
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Categories"
        description="Organize your products into categories."
        actions={
          canWrite && (
            <ButtonLink to="/admin/categories/new">
              <Plus aria-hidden="true" className="size-4" />
              New category
            </ButtonLink>
          )
        }
      />

      <SearchInput
        query={listParams.query}
        onSearch={listParams.setQuery}
        label="Search categories"
        placeholder="Search by name"
      />

      <CategoriesResults
        categories={categoriesQuery.data?.content ?? []}
        isLoading={categoriesQuery.isPending}
        isError={categoriesQuery.isError}
        hasSearch={listParams.query !== ''}
        sort={listParams.sort}
        canWrite={canWrite}
        onSort={listParams.toggleSort}
        onDelete={setCategoryToDelete}
        onClearSearch={listParams.clear}
        onRetry={() => categoriesQuery.refetch()}
      />

      <Pagination
        page={listParams.page}
        totalPages={categoriesQuery.data?.totalPages ?? 0}
        onPageChange={listParams.setPage}
      />

      <DeleteCategoryDialog category={categoryToDelete} onClose={() => setCategoryToDelete(null)} />
    </section>
  )
}
