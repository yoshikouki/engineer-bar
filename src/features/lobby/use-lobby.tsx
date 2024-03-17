import { useEffect } from "react";

import type { BarEventWithSupporters } from "@/hooks/use-data";
import { useUser } from "../user/use-user";
import { Message } from "./schema";
import { useWebSocket } from "./use-websocket";

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
