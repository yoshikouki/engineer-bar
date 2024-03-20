import { ChevronsUpDown, Clock8 } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { BarEvent } from "@/data";
import { SegmentsListItem } from "./segments-list-item";

export const SegmentsList = ({ event }: { event: BarEvent }) => {
  if (event.segments.length === 0) return;

  const currentSegmentId = event.segments.find(
    (segment) =>
      segment.start_time < new Date() && new Date() < segment.end_time,
  )?.id;
  const isTrigger = (segmentId: string, index: number) =>
    (currentSegmentId === undefined && index === 0) ||
    currentSegmentId === segmentId;

  return (
    <Collapsible asChild>
      <div className="flex w-full items-start gap-2">
        <Clock8 size="24" />
        <div className="flex w-full flex-col gap-2">
          {event.segments.map((segment, i) =>
            isTrigger(segment.id, i) ? (
              <CollapsibleTrigger
                key={segment.id}
                className="flex items-center justify-between gap-2 text-left"
              >
                <SegmentsListItem segment={segment} />
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </CollapsibleTrigger>
            ) : (
              <CollapsibleContent key={segment.id} asChild>
                <SegmentsListItem segment={segment} />
              </CollapsibleContent>
            ),
          )}
        </div>
      </div>
    </Collapsible>
  );
};
