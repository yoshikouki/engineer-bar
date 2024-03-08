import { data } from "@/data";

export const useData = () => {
  const events = Object.values(data.events) || [];
  const supporters = data.supporters;
  const eventsWithSupporters = events
    .sort((a, b) => b.id - a.id)
    .map((event) => ({
      ...event,
      supporters: event.supporters.map((id) => supporters[id]),
    }));
  return { events: eventsWithSupporters, supporters };
};
