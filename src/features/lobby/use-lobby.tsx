import { useEffect } from "react";
import { z } from "zod";

import type { BarEventWithSupporters } from "@/hooks/use-data";
import { User, useUser } from "../user/use-user";
import { useWebSocket } from "./use-websocket";

const Message = z.object({
  id: z.string(),
  eventId: z.union([z.string().transform((val) => Number(val)), z.number()]),
  content: z.string(),
  user: User.optional(),
});
export type Message = z.infer<typeof Message>;

export const useLobby = ({ event }: { event: BarEventWithSupporters }) => {
  const eventId = event.id;
  const { user } = useUser();
  const {
    messages: webSocketMessages,
    connect,
    sendMessage,
    isConnecting: isOnline,
  } = useWebSocket({ url: { queries: { eventId } } });

  const messages: Message[] = [];
  for (const m of webSocketMessages) {
    const message = Message.safeParse(m);
    if (!message.success) {
      console.error(message.error);
      continue;
    }
    if (message.data.eventId !== eventId) {
      continue;
    }
    messages.push(message.data);
  }

  const onSendMessage = (newMessage: string) => {
    sendMessage({ content: newMessage, eventId, user });
  };

  useEffect(() => {
    connect();
  }, [connect]);

  return { messages, isOnline, onSendMessage };
};
