import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-dojo-bg/90 backdrop-blur-md border-b border-dojo-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl sm:text-3xl">🥷</span>
            <span className="text-xl sm:text-2xl font-bold text-white group-hover:text-flame transition-colors">
              Ninja<span className="text-flame">Cooks</span>
            </span>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/courses"
              className="px-3 py-2 text-sm sm:text-base text-ninja-200 hover:text-white hover:bg-ninja-700/50 rounded-lg transition-all"
            >
              Courses
            </Link>
            <Link
              href="/instructors"
              className="px-3 py-2 text-sm sm:text-base text-ninja-200 hover:text-white hover:bg-ninja-700/50 rounded-lg transition-all"
            >
              Instructors
            </Link>
            <Link
              href="/testimonials"
              className="px-3 py-2 text-sm sm:text-base text-ninja-200 hover:text-white hover:bg-ninja-700/50 rounded-lg transition-all"
            >
              Testimonials
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}