import type { Metadata } from 'next';
import { getTestimonials } from '@/lib/cosmic';
import TestimonialCard from '@/components/TestimonialCard';

export const metadata: Metadata = {
  title: 'Testimonials — Ninja Cooks Dojo',
  description: 'Hear from students who have trained at the Ninja Cooks Dojo.',
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
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
  );
}