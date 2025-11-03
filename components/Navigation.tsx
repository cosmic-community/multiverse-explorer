'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(path)
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-cosmic-dark/80 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cosmic-purple to-cosmic-blue rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <span className="text-2xl">🌌</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cosmic-purple to-cosmic-blue bg-clip-text text-transparent">
              Multiverse Explorer
            </span>
          </Link>

          <div className="flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/')
                  ? 'bg-gradient-to-r from-cosmic-purple to-cosmic-blue text-white'
                  : 'text-gray-300 hover:text-white hover:bg-cosmic-dark'
              }`}
            >
              Characters
            </Link>
            <Link
              href="/universes"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/universes')
                  ? 'bg-gradient-to-r from-cosmic-purple to-cosmic-blue text-white'
                  : 'text-gray-300 hover:text-white hover:bg-cosmic-dark'
              }`}
            >
              Universes
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}