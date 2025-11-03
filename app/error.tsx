'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <span className="text-9xl">⚠️</span>
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cosmic-purple to-cosmic-blue bg-clip-text text-transparent">
          Dimensional Rift Detected
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          A temporal anomaly has occurred. The fabric of this reality has been disrupted.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="cosmic-button"
          >
            Attempt Repair
          </button>
          <Link href="/" className="px-6 py-3 bg-cosmic-dark text-white font-semibold rounded-lg border border-gray-700 hover:border-cosmic-purple transition-all duration-200">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}