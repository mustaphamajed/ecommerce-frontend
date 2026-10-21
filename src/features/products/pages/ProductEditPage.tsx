import { CircleHelp } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import { ButtonLink, EmptyState, PageHeader, Spinner } from '@/components/ui'
import { ProductForm } from '../components/ProductForm'
import { ProductImageSection } from '../components/ProductImageSection'
import { ProductStatusBadge } from '../components/ProductStatusBadge'
import { useCategoryOptions } from '../hooks/useCategoryOptions'
import { useProduct } from '../hooks/useProduct'
import { useUpdateProduct } from '../hooks/useUpdateProduct'
import { toProductFormValues, toProductInput, type ProductFormValues } from '../schemas/productSchema'

export function ProductEditPage() {
  const { productId } = useParams()
  const id = Number(productId)
  const navigate = useNavigate()
  const productQuery = useProduct(id)
  const categoriesQuery = useCategoryOptions()
  const updateProduct = useUpdateProduct(id)

  const handleSubmit = async (values: ProductFormValues) => {
    await updateProduct.mutateAsync(toProductInput(values))
    navigate('/admin/products')
  }

  const product = productQuery.data
  const isLoading = productQuery.isPending || categoriesQuery.isPending
  const isError = productQuery.isError || categoriesQuery.isError
  const state = isLoading ? 'loading' : isError || !product ? 'error' : 'ready'

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title={product?.name ?? 'Edit product'}
        description={product?.sku}
        actions={product && <ProductStatusBadge status={product.status} />}
      />
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
              title="Product not found"
              action={
                <ButtonLink to="/admin/products" variant="secondary">
                  Back to products
                </ButtonLink>
              }
            />
          ),
          ready: product && (
            <div className="flex flex-col gap-6">
              <ProductImageSection product={product} />
              <ProductForm
                key={product.id}
                defaultValues={toProductFormValues(product)}
                categories={categoriesQuery.data ?? []}
                submitLabel="Save changes"
                onSubmit={handleSubmit}
              />
            </div>
          ),
        }[state]
      }
    </section>
  )
}
