export const AedSymbol = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor">
    {/* D letter with serifs */}
    <path d="M8 4 H28 V10 H22 V90 H28 V96 H8 V90 H16 V10 H8 V4 Z" />
    <path d="M22 4 H50 C78 4 94 26 94 50 C94 74 78 96 50 96 H22 V90 H50 C72 90 84 72 84 50 C84 28 72 10 50 10 H22 V4 Z" />
    {/* Upper horizontal line */}
    <rect x="0" y="32" width="50" height="7" />
    {/* Lower horizontal line */}
    <rect x="0" y="58" width="50" height="7" />
  </svg>
);