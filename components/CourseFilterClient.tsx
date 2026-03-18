'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useCallback } from 'react';
import type { Course } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';
import CourseCard from '@/components/CourseCard';

type Difficulty = 'all' | 'beginner' | 'intermediate' | 'advanced';
type SortOrder = 'featured' | 'price-asc' | 'price-desc';

interface CourseFilterClientProps {
  courses: Course[];
  initialDifficulty: Difficulty;
  initialSort: SortOrder;
}

const DIFFICULTY_OPTIONS: { value: Difficulty; label: string; color: string }[] = [
  { value: 'all', label: 'All', color: 'bg-ninja-700 text-white border-ninja-600 hover:bg-ninja-600' },
  { value: 'beginner', label: 'Beginner', color: 'bg-emerald-900/40 text-emerald-400 border-emerald-700 hover:bg-emerald-800/60' },
  { value: 'intermediate', label: 'Intermediate', color: 'bg-amber-900/40 text-amber-400 border-amber-700 hover:bg-amber-800/60' },
  { value: 'advanced', label: 'Advanced', color: 'bg-red-900/40 text-red-400 border-red-700 hover:bg-red-800/60' },
];

const ACTIVE_DIFFICULTY_COLORS: Record<Difficulty, string> = {
  all: 'bg-white text-ninja-900 border-white',
  beginner: 'bg-emerald-500 text-white border-emerald-500',
  intermediate: 'bg-amber-500 text-white border-amber-500',
  advanced: 'bg-red-500 text-white border-red-500',
};

export default function CourseFilterClient({ courses, initialDifficulty, initialSort }: CourseFilterClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const difficulty = (searchParams.get('difficulty') as Difficulty) || initialDifficulty;
  const sort = (searchParams.get('sort') as SortOrder) || initialSort;

  const updateParams = useCallback((newDifficulty: Difficulty, newSort: SortOrder) => {
    const params = new URLSearchParams();
    if (newDifficulty !== 'all') params.set('difficulty', newDifficulty);
    if (newSort !== 'featured') params.set('sort', newSort);
    const query = params.toString();
    router.push(query ? `/courses?${query}` : '/courses', { scroll: false });
  }, [router]);

  const filteredAndSorted = useMemo(() => {
    let result = courses;

    // Filter by difficulty
    if (difficulty !== 'all') {
      result = result.filter(course => {
        const d = getMetafieldValue(course.metadata?.difficulty).toLowerCase();
        return d === difficulty;
      });
    }

    // Sort
    if (sort === 'price-asc') {
      result = [...result].sort((a, b) => (a.metadata?.price ?? 0) - (b.metadata?.price ?? 0));
    } else if (sort === 'price-desc') {
      result = [...result].sort((a, b) => (b.metadata?.price ?? 0) - (a.metadata?.price ?? 0));
    }

    return result;
  }, [courses, difficulty, sort]);

  const activeDifficultyLabel = DIFFICULTY_OPTIONS.find(o => o.value === difficulty)?.label ?? 'All';

  return (
    <div>
      {/* Filter controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
        {/* Difficulty pills */}
        <div className="flex flex-wrap gap-2">
          {DIFFICULTY_OPTIONS.map(option => {
            const isActive = difficulty === option.value;
            return (
              <button
                key={option.value}
                onClick={() => updateParams(option.value, sort)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-150 ${
                  isActive ? ACTIVE_DIFFICULTY_COLORS[option.value] : option.color
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-ninja-400 text-sm whitespace-nowrap">Sort by</label>
          <select
            id="sort"
            value={sort}
            onChange={e => updateParams(difficulty, e.target.value as SortOrder)}
            className="bg-dojo-card border border-dojo-border text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-flame"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* Result count */}
      <p className="text-ninja-400 text-sm mb-6">
        Showing <span className="text-white font-semibold">{filteredAndSorted.length}</span> of{' '}
        <span className="text-white font-semibold">{courses.length}</span> courses
        {difficulty !== 'all' && (
          <> for <span className="text-white font-semibold">{activeDifficultyLabel}</span></>
        )}
      </p>

      {/* Course grid or empty state */}
      {filteredAndSorted.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block">🥷</span>
          <p className="text-ninja-400 text-lg mb-4">
            No {activeDifficultyLabel.toLowerCase()} courses yet. Check back soon!
          </p>
          <button
            onClick={() => updateParams('all', sort)}
            className="text-flame hover:text-flame-light underline text-sm transition-colors"
          >
            Show all courses
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSorted.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
