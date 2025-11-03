'use client'

import { useState, useEffect } from 'react'
import UniverseCard from '@/components/UniverseCard'
import { Universe, DangerLevel } from '@/types'

export default function UniversesPage() {
  const [universes, setUniverses] = useState<Universe[]>([])
  const [filteredUniverses, setFilteredUniverses] = useState<Universe[]>([])
  const [selectedDanger, setSelectedDanger] = useState<DangerLevel | 'all'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUniverses() {
      try {
        const response = await fetch('/api/universes')
        const data = await response.json()
        setUniverses(data.universes)
        setFilteredUniverses(data.universes)
      } catch (error) {
        console.error('Failed to fetch universes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUniverses()
  }, [])

  useEffect(() => {
    if (selectedDanger === 'all') {
      setFilteredUniverses(universes)
    } else {
      setFilteredUniverses(
        universes.filter(
          (universe) => universe.metadata.danger_level?.key === selectedDanger
        )
      )
    }
  }, [selectedDanger, universes])

  const dangerLevels: { key: DangerLevel | 'all'; label: string; color: string }[] = [
    { key: 'all', label: 'All Universes', color: 'bg-gray-700' },
    { key: 'low', label: 'Low Danger', color: 'bg-green-600' },
    { key: 'moderate', label: 'Moderate Danger', color: 'bg-yellow-600' },
    { key: 'high', label: 'High Danger', color: 'bg-orange-600' },
    { key: 'extreme', label: 'Extreme Danger', color: 'bg-red-600' },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cosmic-purple via-cosmic-blue to-cosmic-pink bg-clip-text text-transparent">
          Parallel Universes
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Explore the diverse dimensions that make up our multiverse, each with its own unique properties and danger levels.
        </p>
      </div>

      {/* Danger Level Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {dangerLevels.map((level) => (
          <button
            key={level.key}
            onClick={() => setSelectedDanger(level.key)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
              selectedDanger === level.key
                ? `${level.color} text-white scale-105 shadow-lg`
                : 'bg-cosmic-dark text-gray-400 hover:text-gray-200 border border-gray-700 hover:border-gray-600'
            }`}
          >
            {level.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-12 h-12 border-4 border-cosmic-purple border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 mt-4">Loading universes...</p>
        </div>
      ) : filteredUniverses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No universes found with {selectedDanger === 'all' ? 'any' : selectedDanger} danger level.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUniverses.map((universe) => (
            <UniverseCard key={universe.id} universe={universe} />
          ))}
        </div>
      )}
    </div>
  )
}