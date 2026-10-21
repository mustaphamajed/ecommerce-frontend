import { TriangleAlert } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Button, EmptyState, PageHeader, Spinner } from '@/components/ui'
import { ProductForm } from '../components/ProductForm'
import { useCategoryOptions } from '../hooks/useCategoryOptions'
import { useCreateProduct } from '../hooks/useCreateProduct'
import { emptyProductForm, toProductInput, type ProductFormValues } from '../schemas/productSchema'

export function ProductCreatePage() {
  const navigate = useNavigate()
  const categoriesQuery = useCategoryOptions()
  const createProduct = useCreateProduct()

  const handleSubmit = async (values: ProductFormValues) => {
    const product = await createProduct.mutateAsync(toProductInput(values))
    navigate(`/admin/products/${product.id}/edit`)
  }

  const state = categoriesQuery.isPending ? 'loading' : categoriesQuery.isError ? 'error' : 'ready'

  return (
    <section className="flex flex-col gap-6">
      <PageHeader title="New product" description="Add a product to your store." />
      {
        {
          loading: (
            <div className="flex justify-center py-24 text-brand-600">
              <Spinner className="size-8" />
            </div>
          ),
          error: (
            <EmptyState
              icon={TriangleAlert}
              title="We couldn't load the categories"
              action={<Button onClick={() => categoriesQuery.refetch()}>Try again</Button>}
            />
          ),
          ready: (
            <ProductForm
              defaultValues={emptyProductForm}
              categories={categoriesQuery.data ?? []}
              submitLabel="Create product"
              onSubmit={handleSubmit}
            />
          ),
        }[state]
      }
    </section>
  )
}
