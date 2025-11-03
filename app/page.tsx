import { getCharacters } from '@/lib/cosmic'
import CharacterCard from '@/components/CharacterCard'
import { Character } from '@/types'

export default async function HomePage() {
  const characters = await getCharacters() as Character[]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cosmic-purple via-cosmic-blue to-cosmic-pink bg-clip-text text-transparent">
          Multiverse Explorer
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Discover extraordinary beings from across parallel dimensions and explore the vast cosmic tapestry of interconnected universes.
        </p>
      </div>

      <section>
        <h2 className="text-3xl font-bold mb-8 text-gray-100">
          Dimensional Travelers
        </h2>
        
        {characters.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No characters found in the multiverse yet.</p>
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