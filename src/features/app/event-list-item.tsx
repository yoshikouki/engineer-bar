import { Calendar, Handshake, Link2, MapPin, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { BarEvent } from "@/data/use-data";
import { toYMD } from "@/lib/format";
import { useState } from "react";

export const EventListItem = ({ event }: { event: BarEvent }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full max-w-md"
    >
      <Card className="flex w-full max-w-md flex-col border-none">
        <CollapsibleTrigger asChild>
          <CardHeader className="px-4 pt-0 pb-2">
            <CardTitle className="flex gap-2">
              <span className="text-primary">#{event.id}</span>
              <span className="text-base text-foreground">
                {event.sub_title}
              </span>
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CardContent className="flex flex-col gap-2 px-4 py-0 text-foreground">
          <CollapsibleTrigger asChild>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Users size="16" />
                <span>{event.participants_count}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size="16" />
                <span className="tabular-nums">{toYMD(event.start_time)}</span>
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col gap-2">
            <Button
              variant="link"
              asChild
              className="h-fit justify-start p-0 text-foreground"
              size="sm"
            >
              <a href={event.url} target="_blank" rel="noopener noreferrer">
                <Link2 size="16" className="mr-2" />
                <span>{new URL(event.url).host}</span>
              </a>
            </Button>
            <div className="flex items-start gap-2">
              <MapPin size="16" className="mt-1" />
              <span className="inline-flex flex-col">
                <span>{event.location.name}</span>
                <span className="text-sm">{event.location.address}</span>
              </span>
            </div>
          </CollapsibleContent>
          <div className="flex items-start gap-2">
            <span className="pt-1 text-foreground">
              <Handshake size="16" />
            </span>
            <span className="flex flex-col gap-2">
              {event.supporters.map((supporter) => (
                <a
                  href={supporter.url}
                  key={supporter.id}
                  className="justify-start text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {supporter.short_name}
                </a>
              ))}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 px-4 pt-2 pb-0 text-foreground">
          <div className="flex w-full gap-2">
            {event.isBefore && (
              <Button variant="default" asChild>
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <span>Join</span>
                </a>
              </Button>
            )}
            <Button variant="ghost" asChild>
              <a href={`/lobbies/${event.id}`} className="w-full">
                <span>Lobby</span>
              </a>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Collapsible>
  );
};
