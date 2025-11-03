import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all characters with their home universe data
export async function getCharacters() {
  try {
    const response = await cosmic.objects
      .find({ type: 'characters' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch characters');
  }
}

// Fetch single character by slug
export async function getCharacter(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'characters', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch character: ${slug}`);
  }
}

// Fetch all universes
export async function getUniverses() {
  try {
    const response = await cosmic.objects
      .find({ type: 'universes' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch universes');
  }
}

// Fetch single universe by slug
export async function getUniverse(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'universes', slug })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch universe: ${slug}`);
  }
}

// Fetch characters from a specific universe
export async function getCharactersByUniverse(universeId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'characters',
        'metadata.home_universe': universeId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch characters by universe');
  }
}