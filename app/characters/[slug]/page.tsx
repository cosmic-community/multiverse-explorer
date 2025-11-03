// app/characters/[slug]/page.tsx
import { getCharacter, getCharacters } from '@/lib/cosmic'
import { Character } from '@/types'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const characters = await getCharacters() as Character[]
  return characters.map((character) => ({
    slug: character.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const character = await getCharacter(slug) as Character | null
  
  if (!character) {
    return {
      title: 'Character Not Found',
    }
  }

  return {
    title: `${character.metadata.name} - Multiverse Explorer`,
    description: character.metadata.powers || `Learn about ${character.metadata.name}`,
  }
}

export default async function CharacterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const character = await getCharacter(slug) as Character | null

  if (!character) {
    notFound()
  }

  const dangerLevel = character.metadata.home_universe?.metadata?.danger_level?.key || 'low'
  const dangerClass = `danger-${dangerLevel}`

  return (
    <div className="container mx-auto px-4 py-12">
      <Link 
        href="/"
        className="inline-flex items-center text-cosmic-blue hover:text-cosmic-purple transition-colors mb-8"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Characters
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Character Portrait */}
        <div className="lg:col-span-1">
          <div className="cosmic-card sticky top-8">
            {character.metadata.portrait?.imgix_url ? (
              <img
                src={`${character.metadata.portrait.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                alt={character.metadata.name}
                className="w-full aspect-square object-cover"
              />
            ) : (
              <div className="w-full aspect-square bg-gradient-to-br from-cosmic-purple to-cosmic-blue flex items-center justify-center">
                <span className="text-6xl">👤</span>
              </div>
            )}
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cosmic-purple to-cosmic-blue bg-clip-text text-transparent">
                {character.metadata.name}
              </h1>
              
              {character.metadata.home_universe && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">Home Universe</h3>
                  <Link 
                    href={`/universes/${character.metadata.home_universe.slug}`}
                    className="inline-flex items-center gap-2 text-cosmic-blue hover:text-cosmic-purple transition-colors"
                  >
                    {character.metadata.home_universe.title}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <span className={`cosmic-badge ${dangerClass} mt-2`}>
                    {character.metadata.home_universe.metadata?.danger_level?.value || 'Unknown'} Danger
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Character Details */}
        <div className="lg:col-span-2">
          <div className="cosmic-card p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-100">Biography</h2>
            {character.metadata.bio ? (
              <div className="markdown-content">
                <ReactMarkdown>{character.metadata.bio}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-gray-400">No biography available.</p>
            )}
          </div>

          <div className="cosmic-card p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-100">Powers & Abilities</h2>
            {character.metadata.powers ? (
              <p className="text-gray-300 leading-relaxed">{character.metadata.powers}</p>
            ) : (
              <p className="text-gray-400">No powers listed.</p>
            )}
          </div>

          {character.metadata.home_universe && (
            <div className="cosmic-card p-8 mt-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-100">Universe Details</h2>
              {character.metadata.home_universe.metadata?.universe_image?.imgix_url && (
                <img
                  src={`${character.metadata.home_universe.metadata.universe_image.imgix_url}?w=1200&h=400&fit=crop&auto=format,compress`}
                  alt={character.metadata.home_universe.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <p className="text-gray-300 leading-relaxed mb-4">
                {character.metadata.home_universe.metadata?.description || 'No description available.'}
              </p>
              <Link 
                href={`/universes/${character.metadata.home_universe.slug}`}
                className="cosmic-button inline-block"
              >
                Explore {character.metadata.home_universe.title}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}