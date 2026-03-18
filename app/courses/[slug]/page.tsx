// app/courses/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCourseBySlug, getCourses, getMetafieldValue } from '@/lib/cosmic';
import DifficultyBadge from '@/components/DifficultyBadge';
import JsonLd from '@/components/JsonLd';

const SITE_URL = 'https://ninja-cooks.cosmic.site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return { title: 'Course Not Found' };
  }

  const thumbnail = course.metadata?.thumbnail_image;
  const description =
    (typeof course.metadata?.description === 'string'
      ? course.metadata.description
      : '')
      .replace(/#{1,6}\s/g, '')
      .replace(/\*\*/g, '')
      .replace(/>/g, '')
      .slice(0, 160);

  const ogImage = thumbnail
    ? `${thumbnail.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
    : `${SITE_URL}/og-default.png`;

  return {
    title: course.title,
    description,
    openGraph: {
      type: 'article',
      title: course.title,
      description,
      url: `${SITE_URL}/courses/${course.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: course.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: course.title,
      description,
      images: [ogImage],
    },
  };
}

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((course) => ({ slug: course.slug }));
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const thumbnail = course.metadata?.thumbnail_image;
  const instructor = course.metadata?.instructor;
  const price = course.metadata?.price;
  const difficulty = getMetafieldValue(course.metadata?.difficulty);
  const lessonCount = course.metadata?.lesson_count;
  const duration = course.metadata?.duration;
  const description = course.metadata?.description;

  // --- Structured Data ---
  const courseSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description:
      typeof description === 'string'
        ? description.replace(/#{1,6}\s/g, '').replace(/\*\*/g, '').replace(/>/g, '').slice(0, 500)
        : '',
    url: `${SITE_URL}/courses/${course.slug}`,
    provider: {
      '@type': 'Organization',
      name: 'Ninja Cooks Dojo',
      sameAs: SITE_URL,
    },
    ...(thumbnail && {
      image: `${thumbnail.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
    }),
    ...(price !== undefined &&
      price !== null && {
        offers: {
          '@type': 'Offer',
          price: price.toString(),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      }),
    ...(difficulty && { educationalLevel: difficulty }),
    ...(instructor && {
      instructor: {
        '@type': 'Person',
        name: getMetafieldValue(instructor.metadata?.name) || instructor.title,
        url: `${SITE_URL}/instructors/${instructor.slug}`,
      },
    }),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Courses', item: `${SITE_URL}/courses` },
      { '@type': 'ListItem', position: 3, name: course.title, item: `${SITE_URL}/courses/${course.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={courseSchema} />
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
              <Link href="/courses" className="hover:text-white transition-colors">
                Courses
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-white" aria-current="page">{course.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Thumbnail */}
            <div className="relative aspect-video rounded-xl overflow-hidden mb-8 border border-dojo-border">
              {thumbnail ? (
                <img
                  src={`${thumbnail.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress`}
                  alt={course.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full bg-ninja-700 flex items-center justify-center">
                  <span className="text-6xl">🍜</span>
                </div>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
              {course.title}
            </h1>

            {difficulty && (
              <div className="mb-6">
                <DifficultyBadge difficulty={difficulty} />
              </div>
            )}

            {description && (
              <div className="prose prose-invert max-w-none">
                <p className="text-ninja-200 text-lg leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-dojo-card border border-dojo-border rounded-xl p-6 space-y-6">
              {/* Price */}
              {price !== undefined && price !== null && (
                <div className="text-center pb-6 border-b border-dojo-border">
                  <p className="text-4xl font-black text-gold-light">${price}</p>
                  <p className="text-ninja-400 text-sm mt-1">One-time payment</p>
                </div>
              )}

              {/* Course Details */}
              <div className="space-y-4">
                {lessonCount !== undefined && lessonCount !== null && (
                  <div className="flex items-center justify-between">
                    <span className="text-ninja-400 text-sm">📚 Lessons</span>
                    <span className="text-white font-medium">{lessonCount}</span>
                  </div>
                )}
                {duration && (
                  <div className="flex items-center justify-between">
                    <span className="text-ninja-400 text-sm">⏱️ Duration</span>
                    <span className="text-white font-medium">{duration}</span>
                  </div>
                )}
                {difficulty && (
                  <div className="flex items-center justify-between">
                    <span className="text-ninja-400 text-sm">📊 Level</span>
                    <span className="text-white font-medium">{difficulty}</span>
                  </div>
                )}
              </div>

              {/* Instructor */}
              {instructor && (
                <div className="pt-6 border-t border-dojo-border">
                  <p className="text-ninja-400 text-xs uppercase tracking-wide mb-3">
                    Your Sensei
                  </p>
                  <Link
                    href={`/instructors/${instructor.slug}`}
                    className="flex items-center gap-3 group"
                  >
                    {instructor.metadata?.photo ? (
                      <img
                        src={`${instructor.metadata.photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                        alt={getMetafieldValue(instructor.metadata?.name) || instructor.title}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover border border-dojo-border group-hover:border-flame transition-colors"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-ninja-700 flex items-center justify-center text-xl border border-dojo-border">
                        🧑‍🍳
                      </div>
                    )}
                    <div>
                      <p className="text-white font-semibold group-hover:text-flame transition-colors">
                        {getMetafieldValue(instructor.metadata?.name) || instructor.title}
                      </p>
                      {instructor.metadata?.specialty && (
                        <p className="text-ninja-400 text-sm">
                          {getMetafieldValue(instructor.metadata.specialty)}
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              )}

              {/* CTA */}
              <button className="w-full bg-flame hover:bg-flame-dark text-white py-3 rounded-xl font-bold transition-colors ninja-glow">
                🔥 Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
