interface DifficultyBadgeProps {
  difficulty: string;
}

export default function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const lower = difficulty.toLowerCase();

  let colorClasses = 'bg-ninja-600/80 text-ninja-100';
  let emoji = '📖';

  if (lower.includes('beginner') || lower.includes('easy')) {
    colorClasses = 'bg-green-900/80 text-green-300';
    emoji = '🌱';
  } else if (lower.includes('intermediate') || lower.includes('medium')) {
    colorClasses = 'bg-yellow-900/80 text-yellow-300';
    emoji = '🔥';
  } else if (lower.includes('advanced') || lower.includes('hard') || lower.includes('expert')) {
    colorClasses = 'bg-red-900/80 text-red-300';
    emoji = '⚔️';
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${colorClasses}`}
    >
      {emoji} {difficulty}
    </span>
  );
}