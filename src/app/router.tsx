import { createBrowserRouter } from 'react-router'
import { AppLayout } from '@/components/layout'
import { LoginPage, RequireAuth, RequirePermission } from '@/features/auth'
import { CategoriesPage } from '@/features/categories'
import { DashboardPage } from '@/features/dashboard'
import { NotFoundPage } from '@/features/errors'
import { UsersPage } from '@/features/users'

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          {
            element: <RequirePermission permission="product:read" />,
            children: [{ path: 'categories', element: <CategoriesPage /> }],
          },
          {
            element: <RequirePermission permission="user:read" />,
            children: [{ path: 'users', element: <UsersPage /> }],
          },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
