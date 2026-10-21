import { FormSection, ImageUploader } from '@/components/ui'
import { useRemoveProductImage } from '../hooks/useRemoveProductImage'
import { useUploadProductImage } from '../hooks/useUploadProductImage'
import type { Product } from '../types'

type ProductImageSectionProps = {
  product: Product
}

export function ProductImageSection({ product }: ProductImageSectionProps) {
  const uploadImage = useUploadProductImage(product.id)
  const removeImage = useRemoveProductImage(product.id)

  return (
    <FormSection title="Image" description="Shown in the store and in the product list.">
      <ImageUploader
        imageUrl={product.imageUrl}
        alt={product.name}
        isUploading={uploadImage.isPending}
        isRemoving={removeImage.isPending}
        onSelect={(file) => uploadImage.mutate(file)}
        onRemove={() => removeImage.mutate()}
      />
    </FormSection>
  )
}
