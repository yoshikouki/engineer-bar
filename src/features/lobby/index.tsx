import { Layout } from "@/components/layout";
import { useData } from "@/hooks/use-data";
import { toHM, toYMD } from "@/lib/format";
import { Clock8 } from "lucide-react";
import { LobbyChat } from "./lobby-chat";
import { LobbyStatus } from "./lobby-status";

export const Lobby = ({ eventId }: { eventId: number }) => {
  const { event } = useData({ eventId });
  if (!event) return <Layout>404 NotFound</Layout>; // TODO: throwing process

  return (
    <Layout event={event} className="flex justify-center">
      <div className="flex flex-col gap-20 mt-20 p-4 max-w-md w-full">
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
          {event.segments.length > 0 && (
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
          )}
        </div>

        <LobbyStatus event={event} />
        <LobbyChat event={event} />
      </div>
    </Layout>
  );
};
