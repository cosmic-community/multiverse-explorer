// app/universes/[slug]/page.tsx
import { getUniverse, getUniverses, getCharactersByUniverse } from '@/lib/cosmic'
import { Universe, Character } from '@/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CharacterCard from '@/components/CharacterCard'

export async function generateStaticParams() {
  const universes = await getUniverses() as Universe[]
  return universes.map((universe) => ({
    slug: universe.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const universe = await getUniverse(slug) as Universe | null
  
  if (!universe) {
    return {
      title: 'Universe Not Found',
    }
  }

  return {
    title: `${universe.metadata.name} - Multiverse Explorer`,
    description: universe.metadata.description || `Explore the ${universe.metadata.name}`,
  }
}

export default async function UniversePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const universe = await getUniverse(slug) as Universe | null

  if (!universe) {
    notFound()
  }

  const characters = await getCharactersByUniverse(universe.id) as Character[]
  const dangerLevel = universe.metadata.danger_level?.key || 'low'
  const dangerClass = `danger-${dangerLevel}`

  return (
    <div className="container mx-auto px-4 py-12">
      <Link 
        href="/universes"
        className="inline-flex items-center text-cosmic-blue hover:text-cosmic-purple transition-colors mb-8"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Universes
      </Link>

      {/* Universe Header */}
      <div className="cosmic-card overflow-hidden mb-12">
        {universe.metadata.universe_image?.imgix_url && (
          <div className="relative h-96 overflow-hidden">
            <img
              src={`${universe.metadata.universe_image.imgix_url}?w=2400&h=800&fit=crop&auto=format,compress`}
              alt={universe.metadata.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cosmic-dark via-cosmic-dark/50 to-transparent"></div>
          </div>
        )}
        
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cosmic-purple to-cosmic-blue bg-clip-text text-transparent">
              {universe.metadata.name}
            </h1>
            <span className={`cosmic-badge ${dangerClass} text-lg px-4 py-2`}>
              {universe.metadata.danger_level?.value || 'Unknown'} Danger
            </span>
          </div>

          <p className="text-xl text-gray-300 leading-relaxed">
            {universe.metadata.description || 'No description available.'}
          </p>
        </div>
      </div>

      {/* Characters from this Universe */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-gray-100">
          Notable Inhabitants
        </h2>
        
        {characters.length === 0 ? (
          <div className="cosmic-card p-12 text-center">
            <p className="text-gray-400 text-lg">
              No known characters from this universe yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}