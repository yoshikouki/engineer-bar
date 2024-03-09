import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useData } from "@/hooks/use-data";
import { toYMD } from "@/lib/format";
import { Calendar, Handshake, Users } from "lucide-react";

export const EventList = () => {
  const { events } = useData();
  return (
    <div className="flex flex-col gap-20 items-center">
      {events.map((event) => (
        <Card
          key={event.id}
          className="flex flex-col gap-2 border-none max-w-md w-full"
        >
          <CardHeader className="py-0 px-4">
            <CardTitle className="flex gap-2">
              <span className="text-primary">#{event.id}</span>
              <span className="text-base text-foreground">
                {event.sub_title}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-foreground py-0 px-4">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Users size="16" />
                <span>{event.participants_count}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size="16" />
                <span>{toYMD(event.start_time)}</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-foreground pt-1">
                <Handshake size="16" />
              </span>
              <span className="flex flex-col gap-2">
                {event.supporters.map((supporter) => (
                  <a
                    href={supporter.url}
                    key={supporter.id}
                    className="justify-start hover:underline text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {supporter.short_name}
                  </a>
                ))}
              </span>
            </div>
          </CardContent>
          <CardFooter className="py-0 px-4"></CardFooter>
        </Card>
      ))}
    </div>
  );
};
