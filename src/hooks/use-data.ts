import { BarEvent, Supporter, data } from "@/data";

export type BarEventWithSupporters = Omit<BarEvent, "supporters"> & {
  isBefore: boolean;
  supporters: Supporter[];
};

type UseDataProps = {
  eventId: number;
};

export const useData = (props?: UseDataProps) => {
  const events = Object.values(data.events) || [];
  const supporters = data.supporters;
  const eventsWithSupporters = events
    .sort((a, b) => b.id - a.id)
    .map((event) => ({
      ...event,
      isBefore: new Date() < new Date(event.end_time),
      supporters: event.supporters.map((id) => supporters[id]),
    }));

  const event = eventsWithSupporters.find(
    (event) => event.id === props?.eventId,
  );
  if (props?.eventId && !event) {
    throw new Error(`Event with id ${props.eventId} not found`);
  }

  return { events: eventsWithSupporters, supporters, event };
};
