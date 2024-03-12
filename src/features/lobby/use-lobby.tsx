import type { BarEventWithSupporters } from "@/hooks/use-data";
import { useEffect, useState } from "react";
import { useWebSocket } from "./use-websocket";

export type Message = {
  id: string;
  content: string;
  user: User;
};

export type User = {
  id: string;
};

const initUser = () => {
  const cachedUser = localStorage.getItem("user");
  if (cachedUser) {
    return JSON.parse(cachedUser) as User;
  }
  const newUser: User = { id: Math.random().toString() };
  localStorage.setItem("user", JSON.stringify(newUser));
  return newUser;
};

export const useLobby = ({ event }: { event: BarEventWithSupporters }) => {
  const [user, setUser] = useState<User>();
  const [newMessage, setNewMessage] = useState("");
  const {
    messages,
    connect,
    sendMessage,
    isConnecting: isOnline,
  } = useWebSocket({ url: { queries: { eventId: event.id } } });

  const onChangeNewMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };
  const onSendMessage = () => {
    sendMessage({ content: newMessage, user });
    setNewMessage("");
  };

  useEffect(() => {
    if (!user) {
      setUser(initUser);
    }
    connect();
  }, [user, connect]);

  return { newMessage, messages, isOnline, onChangeNewMessage, onSendMessage };
};
