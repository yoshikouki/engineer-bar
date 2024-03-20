import type { Segment } from "@/data/raw/events";
import { toHM } from "@/lib/format";

export const SegmentsListItem = ({ segment }: { segment: Segment }) => {
  return (
    <div className="flex justify-start gap-2">
      <span className="inline-flex flex-none gap-1 text-foreground">
        <span className="tabular-nums">{toHM(segment.start_time)}</span>-
        <span className="tabular-nums">{toHM(segment.end_time)}</span>
      </span>
      <span className="flex-1 text-primary">{segment.name}</span>
    </div>
  );
};
