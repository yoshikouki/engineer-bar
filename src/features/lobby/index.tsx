import { Layout } from "@/components/layout";
import { useData } from "@/hooks/use-data";
import { toHM, toYMD } from "@/lib/format";
import { Clock8 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export const Lobby = ({ eventId }: { eventId: number }) => {
  const { event } = useData({ eventId });
  // const now = new Date();
  const now = new Date("2024/03/21 19:10");
  const currentSegment = event?.segments.find(
    (segment) => segment.start_time < now && segment.end_time > now
  );
  const calculateSegmentProgress = useCallback(() => {
    if (!currentSegment) return 0;
    const start = currentSegment.start_time.getTime();
    const end = currentSegment.end_time.getTime();
    return ((now.getTime() - start) / (end - start)) * 100;
  }, [currentSegment, now]);

  const [segmentProgress, setSegmentProgress] = useState(
    calculateSegmentProgress
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSegmentProgress(calculateSegmentProgress());
    }, 1000);
    return () => clearInterval(interval);
  }, [calculateSegmentProgress]);

  if (!event) {
    return (
      <div className="min-h-svh flex flex-col justify-center items-center p-4 gap-4">
        <div className="font-black text-3xl text-destructive">
          Event not found
        </div>
      </div>
    );
  }

  return (
    <Layout event={event}>
      <div className="flex flex-col gap-20 mt-20 p-4">
        <div className="flex flex-col justify-center items-start gap-2">
          <h2 className="flex gap-2 items-baseline font-black">
            <span className="text-2xl text-primary">#{event.id}</span>
            <span className="text-base text-foreground">{event.sub_title}</span>
          </h2>
          <div className="flex gap-1 items-center">
            <span className="tabular-nums">{toYMD(event.start_time)}</span>
            <span className="tabular-nums">{toHM(event.start_time)}</span>-
            <span className="tabular-nums">{toHM(event.end_time)}</span>
          </div>
          <div className="flex gap-2 items-start w-full">
            <Clock8 size="24" className="mt-1" />
            <div className="flex flex-col gap-2 w-full">
              {event.segments.map((segment) => (
                <div key={segment.id} className="flex gap-2">
                  <span className="text-foreground flex-none inline-flex gap-1">
                    <span className="tabular-nums">
                      {toHM(segment.start_time)}
                    </span>
                    -
                    <span className="tabular-nums">
                      {toHM(segment.end_time)}
                    </span>
                  </span>
                  <span className="text-primary flex-1">{segment.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-black text-2xl text-primary">
            <span className="sr-only">Current segment</span>
            {currentSegment?.name}
          </h3>
          <p>progress: {Math.round(segmentProgress)}</p>
        </div>
      </div>
    </Layout>
  );
};
