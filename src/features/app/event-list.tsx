import { useData } from "@/hooks/use-data";

import { EventListItem } from "./event-list-item";

export const EventList = () => {
  const { events } = useData();
  return (
    <div className="flex flex-col items-center gap-20">
      {events.map((event) => (
        <EventListItem key={event.id} event={event} />
      ))}
    </div>
  );
};
