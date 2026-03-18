import type { Testimonial } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';
import StarRating from '@/components/StarRating';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const studentName = getMetafieldValue(testimonial.metadata?.student_name);
  const avatar = testimonial.metadata?.avatar;
  const rating = testimonial.metadata?.rating ?? 5;
  const quote = getMetafieldValue(testimonial.metadata?.quote);
  const course = testimonial.metadata?.course;

  return (
    <article className="bg-dojo-card border border-dojo-border rounded-xl p-6 card-hover">
      <div className="flex items-center gap-3 mb-4">
        {avatar ? (
          <img
            src={`${avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
            alt={studentName || 'Student'}
            width={44}
            height={44}
            className="w-11 h-11 rounded-full object-cover border border-dojo-border"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-ninja-700 flex items-center justify-center text-lg border border-dojo-border">
            🥷
          </div>
        )}
        <div>
          <h3 className="text-white font-semibold text-sm">
            {studentName || 'Anonymous Ninja'}
          </h3>
          {course && (
            <p className="text-ninja-400 text-xs">
              on {course.title}
            </p>
          )}
        </div>
      </div>

      <StarRating rating={rating} />

      {quote && (
        <p className="text-ninja-200 text-sm leading-relaxed mt-3 italic">
          &ldquo;{quote}&rdquo;
        </p>
      )}
    </article>
  );
}