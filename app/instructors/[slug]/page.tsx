// app/instructors/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getInstructorBySlug, getInstructors, getCourses, getMetafieldValue } from '@/lib/cosmic';
import CourseCard from '@/components/CourseCard';
import JsonLd from '@/components/JsonLd';

const SITE_URL = 'https://ninja-cooks.cosmic.site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const instructor = await getInstructorBySlug(slug);

  if (!instructor) {
    return { title: 'Instructor Not Found' };
  }

  const name = getMetafieldValue(instructor.metadata?.name) || instructor.title;
  const bio = getMetafieldValue(instructor.metadata?.bio);
  const photo = instructor.metadata?.photo;
  const description = bio ? bio.slice(0, 160) : `Meet ${name} at Ninja Cooks Dojo.`;
  const ogImage = photo
    ? `${photo.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
    : `${SITE_URL}/og-default.png`;

  return {
    title: name,
    description,
    openGraph: {
      type: 'profile',
      title: name,
      description,
      url: `${SITE_URL}/instructors/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: name,
      description,
      images: [ogImage],
    },
  };
}

export async function generateStaticParams() {
  const instructors = await getInstructors();
  return instructors.map((instructor) => ({ slug: instructor.slug }));
}

export default async function InstructorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const instructor = await getInstructorBySlug(slug);

  if (!instructor) {
    notFound();
  }

  const name = getMetafieldValue(instructor.metadata?.name) || instructor.title;
  const specialty = getMetafieldValue(instructor.metadata?.specialty);
  const bio = getMetafieldValue(instructor.metadata?.bio);
  const photo = instructor.metadata?.photo;

  // Fetch courses by this instructor
  const allCourses = await getCourses();
  const instructorCourses = allCourses.filter(
    (course) => course.metadata?.instructor?.slug === instructor.slug
  );

  // --- Structured Data ---
  const personSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url: `${SITE_URL}/instructors/${slug}`,
    ...(specialty && { jobTitle: specialty }),
    ...(bio && { description: bio.slice(0, 500) }),
    ...(photo && { image: `${photo.imgix_url}?w=400&h=400&fit=crop&auto=format,compress` }),
    worksFor: {
      '@type': 'Organization',
      name: 'Ninja Cooks Dojo',
      url: SITE_URL,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Instructors', item: `${SITE_URL}/instructors` },
      { '@type': 'ListItem', position: 3, name: name, item: `${SITE_URL}/instructors/${slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-ninja-400">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/instructors" className="hover:text-white transition-colors">
                Instructors
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-white" aria-current="page">{name}</li>
          </ol>
        </nav>

        {/* Profile Header */}
        <div className="bg-dojo-card border border-dojo-border rounded-2xl p-6 sm:p-10 mb-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-flame/30 flex-shrink-0">
              {photo ? (
                <img
                  src={`${photo.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                  alt={name}
                  width={176}
                  height={176}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full bg-ninja-700 flex items-center justify-center">
                  <span className="text-6xl">🧑‍🍳</span>
                </div>
              )}
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
                {name}
              </h1>
              {specialty && (
                <p className="text-flame-light text-lg font-medium mb-4">
                  {specialty}
                </p>
              )}
              {bio && (
                <p className="text-ninja-200 leading-relaxed max-w-2xl whitespace-pre-line">
                  {bio}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Instructor Courses */}
        {instructorCourses.length > 0 && (
          <section aria-label={`Courses by ${name}`}>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-6">
              📚 Courses by {name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructorCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>
        )}

        {instructorCourses.length === 0 && (
          <div className="text-center py-12 bg-dojo-card border border-dojo-border rounded-xl">
            <span className="text-4xl block mb-3">🍜</span>
            <p className="text-ninja-400">
              {name} hasn&apos;t published any courses yet. Stay tuned!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
