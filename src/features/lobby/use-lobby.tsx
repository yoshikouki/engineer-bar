import { useEffect, useState } from "react";
import { z } from "zod";

import type { BarEventWithSupporters } from "@/hooks/use-data";
import { User, useUser } from "../user/use-user";
import { useWebSocket } from "./use-websocket";

const Message = z.object({
  id: z.string(),
  content: z.string(),
  // オプショナルなUser
  user: User.optional(),
});
export type Message = z.infer<typeof Message>;

export const useLobby = ({ event }: { event: BarEventWithSupporters }) => {
  const [newMessage, setNewMessage] = useState("");
  const { user } = useUser();
  const {
    messages: webSocketMessages,
    connect,
    sendMessage,
    isConnecting: isOnline,
  } = useWebSocket({ url: { queries: { eventId: event.id } } });

  const messages: Message[] = [];
  for (const m of webSocketMessages) {
    console.log(m);
    const message = Message.safeParse(m);
    console.log(message);
    if (!message.success) {
      console.error(message.error);
      continue;
    }
    messages.push(message.data);
  }

  const onChangeNewMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };
  const onSendMessage = () => {
    console.log("user", user);
    sendMessage({ content: newMessage, user });
    setNewMessage("");
  };

  useEffect(() => {
    connect();
  }, [connect]);

  return { newMessage, messages, isOnline, onChangeNewMessage, onSendMessage };
};
