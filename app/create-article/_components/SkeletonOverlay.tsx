import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonOverlay({ top, left }: { top: number; left: number }) {
  return (
    <div
      className="absolute pointer-events-none z-50 -translate-y-1 flex flex-col gap-2 animate-pulse"
      style={{ top, left }}
      aria-hidden="true"
    >
      <Skeleton className="h-[18px] w-[280px] rounded-full bg-[#222222]" />
      <Skeleton className="h-[18px] w-[360px] rounded-full bg-[#222222]" />
      <Skeleton className="h-[18px] w-[300px] rounded-full bg-[#222222]" />
      <Skeleton className="h-[18px] w-[340px] rounded-full bg-[#222222]" />
      <Skeleton className="h-[18px] w-[200px] rounded-full bg-[#222222]" />
    </div>
  );
}
