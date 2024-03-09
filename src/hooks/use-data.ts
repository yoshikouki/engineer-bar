import { BarEvent, Supporter, data } from "@/data";

export type BarEventWithSupporters = Omit<BarEvent, "supporters"> & {
  isBefore: boolean;
  supporters: Supporter[];
};

export const useData = () => {
  const events = Object.values(data.events) || [];
  const supporters = data.supporters;
  const eventsWithSupporters = events
    .sort((a, b) => b.id - a.id)
    .map((event) => ({
      ...event,
      isBefore: new Date() < new Date(event.end_time),
      supporters: event.supporters.map((id) => supporters[id]),
    }));
  return { events: eventsWithSupporters, supporters };
};
