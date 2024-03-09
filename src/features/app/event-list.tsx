import { useData } from "@/hooks/use-data";

import { EventListItem } from "./event-list-item";

export const EventList = () => {
  const { events } = useData();
  return (
    <div className="flex flex-col gap-20 items-center">
      {events.map((event) => (
        <EventListItem key={event.id} event={event} />
      ))}
    </div>
  );
};
