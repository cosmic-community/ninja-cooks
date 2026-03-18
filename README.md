# Ninja Cooks Dojo

![App Preview](https://imgix.cosmicjs.com/e52e5650-2285-11f1-9917-8fa7b0e99ce3-autopilot-photo-1555939594-58d7cb561ad1-1773809389542.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

An online cooking course platform where food warriors unite to learn, cook, and conquer flavor. Built with Next.js 16 and Cosmic CMS, the Ninja Cooks Dojo features stunning dark ninja-themed design, dynamic course catalogs, instructor profiles, and student testimonials.

## Features

- 🏠 **Dynamic Homepage** — Hero section, featured courses, instructor spotlights, testimonials
- 🍜 **Course Catalog** — Browse courses with difficulty, pricing, duration, and instructor info
- 🧑‍🍳 **Instructor Profiles** — Detailed bios, specialties, and photos
- ⭐ **Student Testimonials** — Star ratings, quotes, and course references
- 📱 **Fully Responsive** — Beautiful on mobile, tablet, and desktop
- ⚡ **Server-Side Rendering** — Blazing fast with Next.js 16 App Router
- 🎨 **Dark Ninja Theme** — Charcoal backgrounds, red accents, golden highlights

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=69ba2e99f7236e573822206c&clone_repository=69ba2fdca531ebbbcc7a48c3)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online course platform with courses (including thumbnail, description, lessons, and pricing), instructors, and student testimonials. User instructions: A place for people to learn and cook together. Join the Ninja Cooks dojo and be a warrior for justice and flavor."

### Code Generation Prompt

> "Build a Next.js application for an online business called 'Ninja Cooks'. The content is managed in Cosmic CMS with the following object types: instructors, courses, testimonials. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: A place for people to learn and cook together. Join the Ninja Cooks dojo and be a warrior for justice and flavor."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Strict type safety

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (or Node.js 18+)
- A [Cosmic](https://www.cosmicjs.com) account with a bucket containing instructors, courses, and testimonials

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd ninja-cooks-dojo

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic bucket credentials

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

### Fetching Courses with Connected Instructors

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: courses } = await cosmic.objects
  .find({ type: 'courses' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Instructor

```typescript
const { object: instructor } = await cosmic.objects
  .findOne({ type: 'instructors', slug: 'chef-ryu' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This app uses three content types from Cosmic:

- **Instructors** — name, specialty, bio, photo
- **Courses** — description, thumbnail, price, difficulty, lesson count, duration, instructor (connected object)
- **Testimonials** — student name, avatar, rating, quote, course (connected object)

All data is fetched server-side using the Cosmic SDK with `depth(1)` to resolve connected objects automatically.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the project on [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Add environment variables in Netlify settings
5. Deploy

<!-- README_END -->