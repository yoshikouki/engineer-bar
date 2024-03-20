import { Layout } from "@/components/layout";
import { useData } from "@/data/use-data";
import { toYMD } from "@/lib/format";
import { LobbyChat } from "./lobby-chat";
import { LobbyStatus } from "./lobby-status";
import { SegmentsList } from "./segments-list";

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
          </div>
          <SegmentsList event={event} />
        </div>

        <LobbyStatus event={event} />
        <LobbyChat event={event} />
      </div>
    </Layout>
  );
};
