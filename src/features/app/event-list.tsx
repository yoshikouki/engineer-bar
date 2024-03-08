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
    <div className="flex flex-col gap-20">
      {events.map((event) => (
        <Card key={event.id} className="flex flex-col gap-2 border-none">
          <CardHeader className="py-0 px-4">
            <CardTitle className="flex gap-2">
              #{event.id}
              <span className="text-base text-muted-foreground">
                {event.sub_title}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between text-muted-foreground py-0 px-4">
            <div className="flex items-center gap-1">
              <Users size="16" />
              <span>{event.participants_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size="16" />
              <span>{toYMD(event.start_time)}</span>
            </div>
          </CardContent>
          <CardFooter className="flex items-start gap-2 py-0 px-4">
            <div className="text-muted-foreground pt-1">
              <Handshake size="16" />
            </div>
            <span className="flex flex-col gap-2">
              {event.supporters.map((supporter) => (
                <a
                  href={supporter.url}
                  key={supporter.id}
                  className="justify-start hover:underline"
                >
                  {supporter.short_name}
                </a>
              ))}
            </span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
