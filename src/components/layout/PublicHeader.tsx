import { Link } from 'react-router'
import { HeaderAuthAction } from './HeaderAuthAction'

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          Shop
        </Link>
        <HeaderAuthAction />
      </div>
    </header>
  )
}
