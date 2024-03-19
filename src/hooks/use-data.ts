import { data } from "@/data";
import type { BarEvent as RawBarEventData } from "@/data/raw/events";

export type BarEvent = RawBarEventData & {
  isBefore: boolean;
};

type UseDataProps = {
  eventId: number;
};

export const useData = (props?: UseDataProps) => {
  const events = Object.fromEntries(
    Object.entries(data.events).map(([id, event]) => {
      return [id, { ...event, isBefore: new Date() < event.end_time }];
    }),
  );
  const supporters = Object.values(data.supporters) || [];
  const event: BarEvent | undefined =
    props?.eventId && data.events[props.eventId]
      ? {
          ...data.events[props.eventId],
          isBefore: new Date() < data.events[props.eventId].end_time,
        }
      : undefined;
  if (props?.eventId && !event) {
    throw new Error(`Event with id ${props.eventId} not found`);
  }

  return { events: Object.values(events), supporters, event };
};
