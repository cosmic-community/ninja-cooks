import Link from 'next/link';
import type { Course } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';
import DifficultyBadge from '@/components/DifficultyBadge';
import StarRating from '@/components/StarRating';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const thumbnail = course.metadata?.thumbnail_image;
  const instructor = course.metadata?.instructor;
  const price = course.metadata?.price;
  const difficulty = getMetafieldValue(course.metadata?.difficulty);
  const lessonCount = course.metadata?.lesson_count;
  const duration = course.metadata?.duration;

  return (
    <Link href={`/courses/${course.slug}`} className="block group">
      <article className="bg-dojo-card border border-dojo-border rounded-xl overflow-hidden card-hover">
        <div className="relative aspect-video overflow-hidden">
          {thumbnail ? (
            <img
              src={`${thumbnail.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={course.title}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-ninja-700 flex items-center justify-center">
              <span className="text-4xl">🍜</span>
            </div>
          )}
          {difficulty && (
            <div className="absolute top-3 left-3">
              <DifficultyBadge difficulty={difficulty} />
            </div>
          )}
          {price !== undefined && price !== null && (
            <div className="absolute top-3 right-3 bg-ninja-900/80 backdrop-blur-sm text-gold-light font-bold px-3 py-1 rounded-lg text-sm">
              ${price}
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-white group-hover:text-flame transition-colors mb-2 line-clamp-2">
            {course.title}
          </h3>

          {course.metadata?.description && (
            <p className="text-ninja-300 text-sm line-clamp-2 mb-4">
              {course.metadata.description}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-ninja-400">
            <div className="flex items-center gap-3">
              {lessonCount !== undefined && lessonCount !== null && (
                <span className="flex items-center gap-1">
                  📚 {lessonCount} lessons
                </span>
              )}
              {duration && (
                <span className="flex items-center gap-1">
                  ⏱️ {duration}
                </span>
              )}
            </div>
          </div>

          {instructor && (
            <div className="mt-4 pt-4 border-t border-dojo-border flex items-center gap-2">
              {instructor.metadata?.photo ? (
                <img
                  src={`${instructor.metadata.photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={getMetafieldValue(instructor.metadata?.name) || instructor.title}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <span className="w-6 h-6 rounded-full bg-ninja-600 flex items-center justify-center text-xs">
                  🧑‍🍳
                </span>
              )}
              <span className="text-sm text-ninja-300">
                {getMetafieldValue(instructor.metadata?.name) || instructor.title}
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}