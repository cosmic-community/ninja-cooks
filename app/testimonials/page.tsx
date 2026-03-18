import type { Metadata } from 'next';
import { getTestimonials, getMetafieldValue } from '@/lib/cosmic';
import TestimonialCard from '@/components/TestimonialCard';
import JsonLd from '@/components/JsonLd';

const SITE_URL = 'https://ninja-cooks.cosmic.site';

export const metadata: Metadata = {
  title: 'Student Reviews',
  description: 'Hear from students who have trained at the Ninja Cooks Dojo. Real reviews from real culinary warriors.',
  openGraph: {
    title: 'Student Reviews — Ninja Cooks Dojo',
    description: 'Hear from students who have trained at the Ninja Cooks Dojo.',
    url: `${SITE_URL}/testimonials`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Reviews — Ninja Cooks Dojo',
    description: 'Hear from students who have trained at the Ninja Cooks Dojo.',
  },
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  // Build AggregateRating + Review schema
  const ratings = testimonials
    .map((t) => Number(t.metadata?.rating))
    .filter((r) => !isNaN(r) && r > 0);

  const avgRating =
    ratings.length > 0
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : null;

  const reviewsSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Ninja Cooks Dojo',
    url: SITE_URL,
    ...(avgRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: avgRating,
        ratingCount: ratings.length,
        bestRating: '5',
        worstRating: '1',
      },
    }),
    review: testimonials.map((t) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: getMetafieldValue(t.metadata?.student_name) || 'Anonymous',
      },
      reviewBody: getMetafieldValue(t.metadata?.quote) || '',
      ...(t.metadata?.rating && {
        reviewRating: {
          '@type': 'Rating',
          ratingValue: String(t.metadata.rating),
          bestRating: '5',
          worstRating: '1',
        },
      }),
    })),
  };

  return (
    <>
      {testimonials.length > 0 && <JsonLd data={reviewsSchema} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold-light px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            ⭐ Student Reviews
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            What Our Ninjas Say
          </h1>
          <p className="text-ninja-300 text-lg max-w-xl mx-auto">
            Real reviews from real warriors who trained in our dojo and leveled up
            their cooking skills.
          </p>
          {avgRating && (
            <p className="text-ninja-400 text-sm mt-3">
              Average rating: <span className="text-gold-light font-bold">{avgRating} / 5</span>
              {' '}from {ratings.length} review{ratings.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">⭐</span>
            <p className="text-ninja-400 text-lg">
              No testimonials yet. Be the first to share your experience!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
