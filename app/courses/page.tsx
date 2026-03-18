import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getCourses } from '@/lib/cosmic';
import CourseFilterClient from '@/components/CourseFilterClient';

export const metadata: Metadata = {
  title: 'Courses — Ninja Cooks Dojo',
  description: 'Browse our collection of ninja cooking courses. From beginner ramen to advanced sushi mastery.',
};

interface CoursesPageProps {
  searchParams: Promise<{ difficulty?: string; sort?: string }>;
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const { difficulty, sort } = await searchParams;
  const courses = await getCourses();

  // Capitalise the difficulty param so it matches our Difficulty type
  const initialDifficulty = difficulty
    ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
    : 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Page Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-flame/10 border border-flame/20 text-flame-light px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          🍜 Course Catalog
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
          All Courses
        </h1>
        <p className="text-ninja-300 text-lg max-w-xl mx-auto">
          Choose your path and master the culinary arts. Every course is a step
          closer to becoming a true cooking ninja.
        </p>
      </div>

      {/* Filter + Grid (client component handles interactivity) */}
      <Suspense
        fallback={
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block animate-pulse">🍜</span>
            <p className="text-ninja-400">Loading courses...</p>
          </div>
        }
      >
        <CourseFilterClient
          courses={courses}
          initialDifficulty={initialDifficulty}
          initialSort={sort}
        />
      </Suspense>
    </div>
  );
}
