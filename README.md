# Multiverse Explorer

![Multiverse Explorer](https://imgix.cosmicjs.com/b4555380-b8a9-11f0-a1cb-ada2c18e54b1-photo-1451187580459-43490279c0fa-1762169942575.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A stunning web application showcasing the interconnected multiverse of characters and dimensions. Explore parallel universes, discover extraordinary beings, and navigate through the cosmic fabric of reality.

## ✨ Features

- **Universe Explorer** - Browse and filter parallel dimensions with interactive cards
- **Character Profiles** - Detailed character pages with bios, powers, and portraits
- **Dimensional Links** - Navigate seamlessly between characters and their home universes
- **Danger Level Indicators** - Visual badges showing universe threat levels
- **Markdown Bio Rendering** - Rich character biographies with proper formatting
- **Responsive Design** - Optimized for all screen sizes and devices
- **Server-Side Rendering** - Fast page loads with Next.js App Router
- **Image Optimization** - imgix-powered image delivery for performance

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=690893f8271316ad9f4d25ce&clone_repository=69089552271316ad9f4d25f0)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "In the muilti vers"

### Code Generation Prompt

> Based on the content model I created for "In the muilti vers", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless content management
- **React Markdown** - Markdown rendering for character bios
- **imgix** - Image optimization and delivery

## 📋 Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with bucket access
- Environment variables (see below)

## 🚀 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd multiverse-explorer
```

2. **Install dependencies**
```bash
bun install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. **Run the development server**
```bash
bun run dev
```

5. **Open your browser**
Navigate to `http://localhost:3000`

## 📚 Cosmic SDK Examples

### Fetching Characters with Universe Data
```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch characters with their home universe data (depth=1)
const { objects: characters } = await cosmic.objects
  .find({ type: 'characters' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Access nested universe data directly
characters.forEach(character => {
  console.log(character.metadata.name)
  console.log(character.metadata.home_universe?.title)
  console.log(character.metadata.home_universe?.metadata?.danger_level?.value)
})
```

### Fetching Single Character
```typescript
// Fetch character by slug with full universe details
const { object: character } = await cosmic.objects
  .findOne({ type: 'characters', slug: 'dr-maya-chen' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

if (character) {
  console.log(character.metadata.bio) // Markdown content
  console.log(character.metadata.powers)
  console.log(character.metadata.portrait?.imgix_url)
}
```

### Fetching Universes
```typescript
// Fetch all universes
const { objects: universes } = await cosmic.objects
  .find({ type: 'universes' })
  .props(['id', 'title', 'slug', 'metadata'])

// Filter by danger level
const extremeDangerUniverses = universes.filter(
  universe => universe.metadata.danger_level?.key === 'extreme'
)
```

## 🌐 Cosmic CMS Integration

This application uses the Cosmic headless CMS to manage all content. The content model includes:

### Object Types

**Characters**
- Name (text, required)
- Bio (markdown)
- Powers (textarea)
- Home Universe (object relationship to Universes)
- Portrait (image file)

**Universes**
- Name (text, required)
- Description (textarea)
- Universe Image (image file)
- Danger Level (select-dropdown: Low, Moderate, High, Extreme)

### Key Features

- **Object Relationships**: Characters are linked to their home universes through the `home_universe` metafield
- **Depth Queries**: Using `depth(1)` fetches nested universe data in a single query
- **Image Optimization**: All images use imgix for automatic optimization with query parameters
- **Type Safety**: Full TypeScript definitions for all Cosmic objects and metadata

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import your repository in Vercel

3. Configure environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`

4. Deploy!

### Deploy to Netlify

1. Push your code to a Git repository

2. Import your repository in Netlify

3. Configure build settings:
   - Build command: `bun run build`
   - Publish directory: `.next`

4. Add environment variables in Netlify dashboard

5. Deploy!

## 📝 Project Structure

```
multiverse-explorer/
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Home page (characters gallery)
│   ├── characters/
│   │   └── [slug]/
│   │       └── page.tsx    # Individual character pages
│   ├── universes/
│   │   ├── page.tsx        # Universes gallery
│   │   └── [slug]/
│   │       └── page.tsx    # Individual universe pages
│   └── globals.css         # Global styles with cosmic theme
├── components/
│   ├── Navigation.tsx      # Main navigation component
│   ├── CharacterCard.tsx   # Character preview cards
│   ├── UniverseCard.tsx    # Universe preview cards
│   └── CosmicBadge.tsx     # "Built with Cosmic" badge
├── lib/
│   └── cosmic.ts           # Cosmic SDK configuration
├── types.ts                # TypeScript type definitions
└── package.json            # Dependencies and scripts
```

## 🎨 Customization

### Styling
The app uses Tailwind CSS with a custom cosmic theme. Modify colors, spacing, and animations in:
- `tailwind.config.js` - Theme configuration
- `app/globals.css` - Global styles and CSS variables

### Content
All content is managed through your Cosmic bucket. To modify:
1. Log in to your Cosmic dashboard
2. Navigate to your bucket
3. Edit Characters or Universes objects
4. Changes appear immediately (server-side rendering)

## 📄 License

MIT License - feel free to use this project for your own multiverse adventures!

<!-- README_END -->