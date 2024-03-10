import { Layout } from "@/components/layout";
import { useData } from "@/hooks/use-data";
import { toHM, toYMD } from "@/lib/format";

export const Lobby = ({ eventId }: { eventId: number }) => {
  const { event } = useData({ eventId });
  if (!event) {
    return (
      <div className="min-h-svh flex flex-col justify-center items-center p-4 gap-4">
        <div className="font-black text-3xl text-destructive">
          Event not found
        </div>
      </div>
    );
  }

  return (
    <Layout event={event}>
      <div className="flex flex-col justify-center items-start gap-2 mt-20 p-4">
        <h2 className="flex gap-2 items-baseline font-black">
          <span className="text-2xl text-primary">#{event.id}</span>
          <span className="text-base text-foreground">{event.sub_title}</span>
        </h2>
        <div className="flex gap-2 items-center">
          {toYMD(event.start_time)}
          <span>{toHM(event.start_time)}</span>-
          <span>{toHM(event.end_time)}</span>
        </div>
      </div>
    </Layout>
  );
};
