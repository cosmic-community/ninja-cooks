import type { Metadata } from 'next';
import { getCourses } from '@/lib/cosmic';
import CourseCard from '@/components/CourseCard';

export const metadata: Metadata = {
  title: 'Courses — Ninja Cooks Dojo',
  description: 'Browse our collection of ninja cooking courses. From beginner ramen to advanced sushi mastery.',
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

      {courses.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block">🍜</span>
          <p className="text-ninja-400 text-lg">
            No courses available yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}