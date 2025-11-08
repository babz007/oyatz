interface ContrastBadgeProps {
  level: 'AA' | 'AAA' | 'fail';
}

export default function ContrastBadge({ level }: ContrastBadgeProps) {
  const variants = {
    AAA: 'bg-green-100 text-green-800',
    AA: 'bg-yellow-100 text-yellow-800',
    fail: 'bg-red-100 text-red-800',
  };

  if (level === 'fail') return null;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${variants[level]}`}
      aria-label={`WCAG ${level} contrast rating`}
    >
      {level}
    </span>
  );
}

