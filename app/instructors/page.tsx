import type { Metadata } from 'next';
import { getInstructors } from '@/lib/cosmic';
import InstructorCard from '@/components/InstructorCard';

export const metadata: Metadata = {
  title: 'Instructors — Ninja Cooks Dojo',
  description: 'Meet the culinary sensei of Ninja Cooks Dojo.',
};

export default async function InstructorsPage() {
  const instructors = await getInstructors();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-flame/10 border border-flame/20 text-flame-light px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          🧑‍🍳 Our Sensei
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
          Meet the Instructors
        </h1>
        <p className="text-ninja-300 text-lg max-w-xl mx-auto">
          Learn from the finest culinary warriors. Each sensei brings decades of
          experience and passion to the dojo.
        </p>
      </div>

      {instructors.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block">🧑‍🍳</span>
          <p className="text-ninja-400 text-lg">
            No instructors listed yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>
      )}
    </div>
  );
}