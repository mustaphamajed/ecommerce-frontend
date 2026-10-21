import { CircleHelp } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import { ButtonLink, EmptyState, PageHeader, Spinner } from '@/components/ui'
import { CategoryForm } from '../components/CategoryForm'
import { useCategory } from '../hooks/useCategory'
import { useUpdateCategory } from '../hooks/useUpdateCategory'
import { toCategoryFormValues, toCategoryInput, type CategoryFormValues } from '../schemas/categorySchema'

export function CategoryEditPage() {
  const { categoryId } = useParams()
  const id = Number(categoryId)
  const navigate = useNavigate()
  const categoryQuery = useCategory(id)
  const updateCategory = useUpdateCategory(id)

  const handleSubmit = async (values: CategoryFormValues) => {
    await updateCategory.mutateAsync(toCategoryInput(values))
    navigate('/admin/categories')
  }

  const state = categoryQuery.isPending ? 'loading' : categoryQuery.isError ? 'error' : 'ready'

  return (
    <section className="flex flex-col gap-6">
      <PageHeader title="Edit category" description={categoryQuery.data?.name} />
      {
        {
          loading: (
            <div className="flex justify-center py-24 text-brand-600">
              <Spinner className="size-8" />
            </div>
          ),
          error: (
            <EmptyState
              icon={CircleHelp}
              title="Category not found"
              description="It may have been deleted."
              action={
                <ButtonLink to="/admin/categories" variant="secondary">
                  Back to categories
                </ButtonLink>
              }
            />
          ),
          ready: categoryQuery.data && (
            <CategoryForm
              key={categoryQuery.data.id}
              defaultValues={toCategoryFormValues(categoryQuery.data)}
              submitLabel="Save changes"
              slugHint="Changing the slug changes the category URL."
              onSubmit={handleSubmit}
            />
          ),
        }[state]
      }
    </section>
  )
}
