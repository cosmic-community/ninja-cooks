import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-ninja-900 border-t border-dojo-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🥷</span>
              <span className="text-xl font-bold text-white">
                Ninja<span className="text-flame">Cooks</span>
              </span>
            </Link>
            <p className="text-ninja-300 text-sm leading-relaxed">
              A place for people to learn and cook together. Join the Ninja Cooks
              dojo and be a warrior for justice and flavor.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-ninja-300 hover:text-flame text-sm transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/instructors" className="text-ninja-300 hover:text-flame text-sm transition-colors">
                  Our Instructors
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-ninja-300 hover:text-flame text-sm transition-colors">
                  Student Reviews
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Join the Dojo</h3>
            <p className="text-ninja-300 text-sm leading-relaxed mb-4">
              Ready to master the art of cooking? Start your journey today.
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-flame hover:bg-flame-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              🔥 Start Learning
            </Link>
          </div>
        </div>

        <div className="border-t border-dojo-border mt-8 pt-8 text-center">
          <p className="text-ninja-400 text-sm">
            © {new Date().getFullYear()} Ninja Cooks Dojo. All rights reserved. Built with{' '}
            <a
              href="https://www.cosmicjs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-flame hover:text-flame-light transition-colors"
            >
              Cosmic
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}