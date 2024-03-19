import { useEffect } from "react";

import type { BarEvent } from "@/hooks/use-data";
import { useUser } from "../user/use-user";
import { IncomingMessage, type Message, type TopicsSuggestion } from "./schema";
import { useWebSocket } from "./use-websocket";

export const useLobby = ({ event }: { event: BarEvent }) => {
  const eventId = event.id;
  const { user } = useUser();
  const {
    messages: webSocketMessages,
    connect,
    sendMessage,
    isConnecting: isOnline,
  } = useWebSocket({ url: { queries: { eventId } } });

  const messages: Message[] = [];
  const suggestion: {
    topics?: TopicsSuggestion;
  } = {
    topics: undefined,
  };
  for (const m of webSocketMessages) {
    const message = IncomingMessage.safeParse(m);
    if (!message.success) {
      console.error(message.error);
      continue;
    }
    if (message.data.eventId !== eventId) {
      continue;
    }
    if (message.data.type === "message") {
      messages.push(message.data);
    } else if (message.data.type === "topicSuggestion") {
      suggestion.topics = message.data;
    }
  }

  const onSendMessage = (newMessage: string) => {
    sendMessage({ type: "newMessage", content: newMessage, eventId, user });
  };

  useEffect(() => {
    connect();
  }, [connect]);

  return { messages, suggestion, isOnline, onSendMessage };
};
