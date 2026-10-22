export type CatalogProduct = {
  id: number
  sku: string
  name: string
  description: string | null
  price: number
  categoryName: string | null
  categorySlug: string | null
  imageUrl: string | null
  inStock: boolean
}

export type CatalogCategory = {
  id: number
  name: string
  slug: string
}

export type CatalogProductsParams = {
  query: string
  category: string
  page: number
}
