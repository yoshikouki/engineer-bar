import { useData } from "@/hooks/use-data";

export const EventList = () => {
  const { events } = useData();
  return (
    <div className="flex flex-col gap-4">
      {events.map((event) => (
        <div key={event.id} className="flex flex-col gap-2">
          <h3 className="font-bold text-2xl">{event.name}</h3>
        </div>
      ))}
    </div>
  );
};
