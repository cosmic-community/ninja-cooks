import Link from 'next/link';
import { getCourses, getInstructors, getTestimonials, getMetafieldValue } from '@/lib/cosmic';
import CourseCard from '@/components/CourseCard';
import InstructorCard from '@/components/InstructorCard';
import TestimonialCard from '@/components/TestimonialCard';

export default async function HomePage() {
  const [courses, instructors, testimonials] = await Promise.all([
    getCourses(),
    getInstructors(),
    getTestimonials(),
  ]);

  const featuredCourses = courses.slice(0, 3);
  const featuredInstructors = instructors.slice(0, 4);
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-flame/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-radial from-flame/5 via-transparent to-transparent opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-flame/10 border border-flame/20 text-flame-light px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            🥷 Welcome to the Dojo
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Master the Art of
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-flame via-flame-light to-gold">
              Ninja Cooking
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-ninja-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            A place for people to learn and cook together. Join the Ninja Cooks
            dojo and be a warrior for justice and flavor.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-flame hover:bg-flame-dark text-white px-8 py-3.5 rounded-xl font-bold text-lg transition-all ninja-glow hover:scale-105"
            >
              🔥 Explore Courses
            </Link>
            <Link
              href="/instructors"
              className="inline-flex items-center gap-2 bg-ninja-700/50 hover:bg-ninja-600/50 text-white border border-dojo-border px-8 py-3.5 rounded-xl font-bold text-lg transition-all hover:scale-105"
            >
              🧑‍🍳 Meet Instructors
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-white">{courses.length}</p>
              <p className="text-ninja-400 text-sm mt-1">Courses</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-white">{instructors.length}</p>
              <p className="text-ninja-400 text-sm mt-1">Instructors</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-white">{testimonials.length}</p>
              <p className="text-ninja-400 text-sm mt-1">Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      {featuredCourses.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                🍜 Popular Courses
              </h2>
              <p className="text-ninja-400 mt-2">Level up your kitchen skills</p>
            </div>
            <Link
              href="/courses"
              className="hidden sm:inline-flex items-center gap-1 text-flame hover:text-flame-light font-medium transition-colors"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/courses"
              className="inline-flex items-center gap-1 text-flame hover:text-flame-light font-medium transition-colors"
            >
              View all courses →
            </Link>
          </div>
        </section>
      )}

      {/* Instructors */}
      {featuredInstructors.length > 0 && (
        <section className="bg-ninja-900/50 border-y border-dojo-border py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                🧑‍🍳 Our Sensei
              </h2>
              <p className="text-ninja-400 mt-2">
                Learn from the finest culinary warriors
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredInstructors.map((instructor) => (
                <InstructorCard key={instructor.id} instructor={instructor} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/instructors"
                className="inline-flex items-center gap-1 text-flame hover:text-flame-light font-medium transition-colors"
              >
                Meet all instructors →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {featuredTestimonials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              ⭐ Student Warriors Speak
            </h2>
            <p className="text-ninja-400 mt-2">
              Hear from ninjas who&apos;ve trained in our dojo
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-1 text-flame hover:text-flame-light font-medium transition-colors"
            >
              Read all testimonials →
            </Link>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-flame/10 via-dojo-card to-gold/5 border border-flame/20 rounded-2xl p-8 sm:p-12 text-center ninja-glow">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Ready to Begin Your Training? 🔥
          </h2>
          <p className="text-ninja-300 text-lg max-w-xl mx-auto mb-8">
            Step into the dojo and master the culinary arts. Your journey from
            kitchen novice to cooking ninja starts here.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-flame hover:bg-flame-dark text-white px-8 py-3.5 rounded-xl font-bold text-lg transition-all hover:scale-105"
          >
            ⚔️ Start Training Now
          </Link>
        </div>
      </section>
    </div>
  );
}