// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Universe type with metadata
export interface Universe extends CosmicObject {
  type: 'universes';
  metadata: {
    name: string;
    description?: string;
    universe_image?: {
      url: string;
      imgix_url: string;
    };
    danger_level?: {
      key: string;
      value: 'Low' | 'Moderate' | 'High' | 'Extreme';
    };
  };
}

// Character type with metadata
export interface Character extends CosmicObject {
  type: 'characters';
  metadata: {
    name: string;
    bio?: string;
    powers?: string;
    home_universe?: Universe;
    portrait?: {
      url: string;
      imgix_url: string;
    };
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Danger level type for filtering
export type DangerLevel = 'low' | 'moderate' | 'high' | 'extreme';