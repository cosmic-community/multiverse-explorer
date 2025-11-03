import { NextResponse } from 'next/server'
import { getUniverses } from '@/lib/cosmic'

export async function GET() {
  try {
    const universes = await getUniverses()
    return NextResponse.json({ universes })
  } catch (error) {
    console.error('Error fetching universes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch universes' },
      { status: 500 }
    )
  }
}