export const CalendarSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex justify-between items-center mb-8">
      <div className="w-8 h-8 rounded-full bg-stone-200" />
      <div className="w-48 h-6 rounded bg-stone-200" />
      <div className="w-8 h-8 rounded-full bg-stone-200" />
    </div>
    <div className="grid grid-cols-7 gap-1">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="h-6 rounded bg-stone-100" />
      ))}
      {Array.from({ length: 35 }).map((_, i) => (
        <div key={i} className="h-20 rounded-lg bg-stone-100" />
      ))}
    </div>
  </div>
);

