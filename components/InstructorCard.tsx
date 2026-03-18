import Link from 'next/link';
import type { Instructor } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

interface InstructorCardProps {
  instructor: Instructor;
}

export default function InstructorCard({ instructor }: InstructorCardProps) {
  const photo = instructor.metadata?.photo;
  const name = getMetafieldValue(instructor.metadata?.name) || instructor.title;
  const specialty = getMetafieldValue(instructor.metadata?.specialty);
  const bio = getMetafieldValue(instructor.metadata?.bio);

  return (
    <Link href={`/instructors/${instructor.slug}`} className="block group">
      <article className="bg-dojo-card border border-dojo-border rounded-xl overflow-hidden card-hover text-center p-6">
        <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-2 border-flame/30 group-hover:border-flame transition-colors">
          {photo ? (
            <img
              src={`${photo.imgix_url}?w=256&h=256&fit=crop&auto=format,compress`}
              alt={name}
              width={112}
              height={112}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-ninja-700 flex items-center justify-center">
              <span className="text-4xl">🧑‍🍳</span>
            </div>
          )}
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-flame transition-colors mb-1">
          {name}
        </h3>

        {specialty && (
          <p className="text-flame-light text-sm font-medium mb-3">{specialty}</p>
        )}

        {bio && (
          <p className="text-ninja-300 text-sm line-clamp-3 leading-relaxed">
            {bio}
          </p>
        )}
      </article>
    </Link>
  );
}