import Link from 'next/link'
import { Universe } from '@/types'

interface UniverseCardProps {
  universe: Universe
}

export default function UniverseCard({ universe }: UniverseCardProps) {
  const dangerLevel = universe.metadata.danger_level?.key || 'low'
  const dangerClass = `danger-${dangerLevel}`

  return (
    <Link href={`/universes/${universe.slug}`}>
      <div className="cosmic-card group h-full flex flex-col overflow-hidden">
        <div className="relative h-56 overflow-hidden">
          {universe.metadata.universe_image?.imgix_url ? (
            <img
              src={`${universe.metadata.universe_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={universe.metadata.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cosmic-purple via-cosmic-blue to-cosmic-pink flex items-center justify-center">
              <span className="text-6xl">🌌</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-cosmic-dark via-transparent to-transparent opacity-60"></div>
          <div className="absolute top-3 right-3">
            <span className={`cosmic-badge ${dangerClass}`}>
              {universe.metadata.danger_level?.value || 'Unknown'}
            </span>
          </div>
        </div>

        <div className="p-6 flex-grow flex flex-col bg-cosmic-dark">
          <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-cosmic-purple to-cosmic-blue bg-clip-text text-transparent group-hover:from-cosmic-blue group-hover:to-cosmic-purple transition-all">
            {universe.metadata.name}
          </h3>

          <p className="text-gray-300 text-sm line-clamp-3 flex-grow mb-4">
            {universe.metadata.description || 'A mysterious universe awaiting exploration.'}
          </p>

          <div className="flex items-center text-cosmic-blue group-hover:text-cosmic-purple transition-colors">
            <span className="font-medium">Explore Universe</span>
            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}