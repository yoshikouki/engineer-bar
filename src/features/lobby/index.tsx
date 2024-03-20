import { Layout } from "@/components/layout";
import { useData } from "@/data/use-data";
import { toHM, toYMD } from "@/lib/format";
import { Clock8 } from "lucide-react";
import { LobbyChat } from "./lobby-chat";
import { LobbyStatus } from "./lobby-status";

export const Lobby = ({ eventId }: { eventId: number }) => {
  const { event } = useData({ eventId });
  if (!event) return <Layout>404 NotFound</Layout>; // TODO: throwing process

  return (
    <Layout event={event} className="flex justify-center">
      <div className="mt-20 flex w-full max-w-md flex-col gap-20 p-4">
        <div className="flex flex-col items-start justify-center gap-2">
          <h2 className="flex items-baseline gap-2 font-black">
            <span className="text-2xl text-primary">#{event.id}</span>
            <span className="text-base text-foreground">{event.sub_title}</span>
          </h2>
          <div className="flex items-center gap-1">
            <span className="tabular-nums">{toYMD(event.start_time)}</span>
            <span className="tabular-nums">{toHM(event.start_time)}</span>-
            <span className="tabular-nums">{toHM(event.end_time)}</span>
          </div>
          {event.segments.length > 0 && (
            <div className="flex w-full items-start gap-2">
              <Clock8 size="24" className="mt-1" />
              <div className="flex w-full flex-col gap-2">
                {event.segments.map((segment) => (
                  <div key={segment.id} className="flex gap-2">
                    <span className="inline-flex flex-none gap-1 text-foreground">
                      <span className="tabular-nums">
                        {toHM(segment.start_time)}
                      </span>
                      -
                      <span className="tabular-nums">
                        {toHM(segment.end_time)}
                      </span>
                    </span>
                    <span className="flex-1 text-primary">{segment.name}</span>
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
