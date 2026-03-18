import type { Metadata } from 'next';
import { getCourses } from '@/lib/cosmic';
import CourseFilterClient from '@/components/CourseFilterClient';

const SITE_URL = 'https://ninja-cooks.cosmic.site';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Browse our collection of ninja cooking courses. From beginner ramen to advanced sushi mastery.',
  openGraph: {
    title: 'Courses — Ninja Cooks Dojo',
    description: 'Browse our collection of ninja cooking courses. From beginner ramen to advanced sushi mastery.',
    url: `${SITE_URL}/courses`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Courses — Ninja Cooks Dojo',
    description: 'Browse our collection of ninja cooking courses.',
  },
};

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
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

      <CourseFilterClient courses={courses} />
    </div>
  );
}
