import { useNavigate } from 'react-router'
import { PageHeader } from '@/components/ui'
import { CategoryForm } from '../components/CategoryForm'
import { useCreateCategory } from '../hooks/useCreateCategory'
import { emptyCategoryForm, toCategoryInput, type CategoryFormValues } from '../schemas/categorySchema'

export function CategoryCreatePage() {
  const navigate = useNavigate()
  const createCategory = useCreateCategory()

  const handleSubmit = async (values: CategoryFormValues) => {
    await createCategory.mutateAsync(toCategoryInput(values))
    navigate('/admin/categories')
  }

  return (
    <section className="flex flex-col gap-6">
      <PageHeader title="New category" description="Add a category to organize your products." />
      <CategoryForm
        defaultValues={emptyCategoryForm}
        submitLabel="Create category"
        slugHint="Leave empty to generate it from the name."
        onSubmit={handleSubmit}
      />
    </section>
  )
}
