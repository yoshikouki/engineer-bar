import { Skeleton } from "@/components/ui/skeleton";
import { BarEventWithSupporters } from "@/hooks/use-data";
import * as Progress from "@radix-ui/react-progress";
import { useCallback, useEffect, useRef, useState } from "react";

export const LobbyStatus = ({ event }: { event: BarEventWithSupporters }) => {
  const intervalRef = useRef<Timer>();
  const [now, setNow] = useState(new Date());
  const currentSegment = event.segments.find(
    (segment) => segment.start_time < now && now < segment.end_time,
  );
  const calculateSegmentProgress = useCallback(
    (now: Date) => {
      if (!currentSegment) return 0;
      const start = currentSegment.start_time.getTime();
      const end = currentSegment.end_time.getTime();
      const progress = ((now.getTime() - start) / (end - start)) * 100;
      return progress;
    },
    [currentSegment],
  );
  const segmentProgress = calculateSegmentProgress(now);

  useEffect(() => {
    intervalRef.current = setInterval(() => setNow(new Date()), 100);
    return () => clearInterval(intervalRef.current);
  }, []);

  return intervalRef.current && currentSegment ? (
    <div className="flex flex-col gap-2 items-start">
      <h3 className="font-black text-2xl text-primary">
        <span className="sr-only">Current segment</span>
        {currentSegment?.name}
      </h3>
      <Progress.Root className="relative h-4 w-full overflow-hidden rounded-full bg-secondary">
        <Progress.Indicator
          className="h-full w-full flex-1 bg-foreground transition-all"
          style={{
            transform: `translateX(-${100 - (segmentProgress || 0)}%)`,
          }}
        />
      </Progress.Root>
    </div>
  ) : now < event.start_time ? (
    <div className="flex justify-center mt-20 w-full font-black text-3xl text-primary">
      Coming soon...
    </div>
  ) : event.end_time < now ? (
    <div className="flex justify-center mt-20 w-full font-black text-3xl text-primary">
      完
    </div>
  ) : (
    <Skeleton className="h-40 max-w-md w-full rounded-xl" />
  );
};