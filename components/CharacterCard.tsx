import Link from 'next/link'
import { Character } from '@/types'

interface CharacterCardProps {
  character: Character
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const dangerLevel = character.metadata.home_universe?.metadata?.danger_level?.key || 'low'
  const dangerClass = `danger-${dangerLevel}`

  return (
    <Link href={`/characters/${character.slug}`}>
      <div className="cosmic-card group h-full flex flex-col">
        <div className="relative overflow-hidden aspect-square">
          {character.metadata.portrait?.imgix_url ? (
            <img
              src={`${character.metadata.portrait.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
              alt={character.metadata.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cosmic-purple to-cosmic-blue flex items-center justify-center">
              <span className="text-6xl">👤</span>
            </div>
          )}
          {character.metadata.home_universe && (
            <div className="absolute top-3 right-3">
              <span className={`cosmic-badge ${dangerClass}`}>
                {character.metadata.home_universe.metadata?.danger_level?.value || 'Unknown'}
              </span>
            </div>
          )}
        </div>

        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cosmic-purple to-cosmic-blue bg-clip-text text-transparent group-hover:from-cosmic-blue group-hover:to-cosmic-purple transition-all">
            {character.metadata.name}
          </h3>

          {character.metadata.home_universe && (
            <p className="text-sm text-gray-400 mb-3">
              From {character.metadata.home_universe.title}
            </p>
          )}

          {character.metadata.powers && (
            <p className="text-gray-300 text-sm line-clamp-2 flex-grow">
              {character.metadata.powers}
            </p>
          )}

          <div className="mt-4 flex items-center text-cosmic-blue group-hover:text-cosmic-purple transition-colors">
            <span className="font-medium">View Profile</span>
            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}