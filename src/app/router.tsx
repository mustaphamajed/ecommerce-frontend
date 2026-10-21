import { createBrowserRouter } from 'react-router'
import { AppLayout, PublicLayout } from '@/components/layout'
import { LoginPage, RequireAuth, RequirePermission } from '@/features/auth'
import { CatalogPage } from '@/features/catalog'
import { CategoriesPage, CategoryCreatePage, CategoryEditPage } from '@/features/categories'
import { DashboardPage } from '@/features/dashboard'
import { NotFoundPage } from '@/features/errors'
import { ProductCreatePage, ProductEditPage, ProductsPage } from '@/features/products'
import { UserCreatePage, UserEditPage, UsersPage } from '@/features/users'

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [{ index: true, element: <CatalogPage /> }],
  },
  { path: '/login', element: <LoginPage /> },
  {
    path: '/admin',
    element: <RequireAuth />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          {
            element: <RequirePermission permission="product:read" />,
            children: [
              { path: 'products', element: <ProductsPage /> },
              { path: 'categories', element: <CategoriesPage /> },
            ],
          },
          {
            element: <RequirePermission permission="product:write" />,
            children: [
              { path: 'products/new', element: <ProductCreatePage /> },
              { path: 'products/:productId/edit', element: <ProductEditPage /> },
              { path: 'categories/new', element: <CategoryCreatePage /> },
              { path: 'categories/:categoryId/edit', element: <CategoryEditPage /> },
            ],
          },
          {
            element: <RequirePermission permission="user:read" />,
            children: [{ path: 'users', element: <UsersPage /> }],
          },
          {
            element: <RequirePermission permission="user:manage" />,
            children: [
              { path: 'users/new', element: <UserCreatePage /> },
              { path: 'users/:userId/edit', element: <UserEditPage /> },
            ],
          },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
