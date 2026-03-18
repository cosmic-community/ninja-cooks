'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import type { Course } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';
import CourseCard from '@/components/CourseCard';

type Difficulty = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';
type SortOrder = 'default' | 'price-asc' | 'price-desc';

const DIFFICULTIES: Difficulty[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  All: 'bg-ninja-700 hover:bg-ninja-600 text-white',
  Beginner: 'bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-300 border border-emerald-700/50',
  Intermediate: 'bg-amber-900/60 hover:bg-amber-800/80 text-amber-300 border border-amber-700/50',
  Advanced: 'bg-red-900/60 hover:bg-red-800/80 text-red-300 border border-red-700/50',
};

const DIFFICULTY_ACTIVE_STYLES: Record<Difficulty, string> = {
  All: 'bg-flame text-white shadow-lg shadow-flame/25',
  Beginner: 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 border-transparent',
  Intermediate: 'bg-amber-500 text-white shadow-lg shadow-amber-500/25 border-transparent',
  Advanced: 'bg-red-600 text-white shadow-lg shadow-red-600/25 border-transparent',
};

interface CourseFilterClientProps {
  courses: Course[];
  initialDifficulty?: string;
  initialSort?: string;
}

export default function CourseFilterClient({
  courses,
  initialDifficulty = 'All',
  initialSort = 'default',
}: CourseFilterClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty>(
    (initialDifficulty as Difficulty) || 'All'
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    (initialSort as SortOrder) || 'default'
  );

  // Update URL search params without page reload
  const updateParams = useCallback(
    (difficulty: Difficulty, sort: SortOrder) => {
      const params = new URLSearchParams(searchParams.toString());
      if (difficulty === 'All') {
        params.delete('difficulty');
      } else {
        params.set('difficulty', difficulty.toLowerCase());
      }
      if (sort === 'default') {
        params.delete('sort');
      } else {
        params.set('sort', sort);
      }
      const query = params.toString();
      router.replace(`${pathname}${query ? `?${query}` : ''}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const handleDifficultyChange = (difficulty: Difficulty) => {
    setActiveDifficulty(difficulty);
    updateParams(difficulty, sortOrder);
  };

  const handleSortChange = (sort: SortOrder) => {
    setSortOrder(sort);
    updateParams(activeDifficulty, sort);
  };

  // Filter and sort courses in the browser
  const filteredCourses = useMemo(() => {
    let result = courses.filter((course) => {
      if (activeDifficulty === 'All') return true;
      const diff = getMetafieldValue(course.metadata?.difficulty);
      return diff.toLowerCase() === activeDifficulty.toLowerCase();
    });

    if (sortOrder === 'price-asc') {
      result = [...result].sort((a, b) => (a.metadata?.price ?? 0) - (b.metadata?.price ?? 0));
    } else if (sortOrder === 'price-desc') {
      result = [...result].sort((a, b) => (b.metadata?.price ?? 0) - (a.metadata?.price ?? 0));
    }

    return result;
  }, [courses, activeDifficulty, sortOrder]);

  return (
    <div>
      {/* Filter & Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
        {/* Difficulty Filter */}
        <div className="flex flex-wrap gap-2">
          {DIFFICULTIES.map((difficulty) => {
            const isActive = activeDifficulty === difficulty;
            return (
              <button
                key={difficulty}
                onClick={() => handleDifficultyChange(difficulty)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? DIFFICULTY_ACTIVE_STYLES[difficulty]
                    : DIFFICULTY_STYLES[difficulty]
                }`}
                aria-pressed={isActive}
              >
                {difficulty === 'All' ? '🥷 All Levels' : difficulty}
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-ninja-400 text-sm whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortOrder}
            onChange={(e) => handleSortChange(e.target.value as SortOrder)}
            className="bg-dojo-card border border-dojo-border text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flame/50 cursor-pointer"
          >
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* Result Count */}
      <p className="text-ninja-400 text-sm mb-6">
        Showing{' '}
        <span className="text-white font-semibold">{filteredCourses.length}</span>
        {' '}of{' '}
        <span className="text-white font-semibold">{courses.length}</span>
        {' '}course{courses.length !== 1 ? 's' : ''}
        {activeDifficulty !== 'All' && (
          <span className="ml-1">for <span className="text-flame-light font-medium">{activeDifficulty}</span></span>
        )}
      </p>

      {/* Course Grid or Empty State */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-dojo-border rounded-xl">
          <span className="text-6xl mb-4 block">🥷</span>
          <p className="text-white font-bold text-xl mb-2">No {activeDifficulty} courses yet</p>
          <p className="text-ninja-400 text-sm">
            Try a different difficulty level or{' '}
            <button
              onClick={() => handleDifficultyChange('All')}
              className="text-flame-light underline hover:no-underline"
            >
              view all courses
            </button>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
