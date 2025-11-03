import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <span className="text-9xl">🌌</span>
        </div>
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cosmic-purple to-cosmic-blue bg-clip-text text-transparent">
          Lost in the Multiverse
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          This dimension doesn't seem to exist in our multiverse. Perhaps it was erased by a temporal anomaly?
        </p>
        <Link href="/" className="cosmic-button inline-block">
          Return to Home Universe
        </Link>
      </div>
    </div>
  )
}