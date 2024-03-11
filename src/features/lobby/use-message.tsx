import { BarEventWithSupporters } from "@/hooks/use-data";
import { useEffect, useRef, useState } from "react";
import { LobbyApp, Message, User } from "./lobby-app";

const initUser = () => {
  const cachedUser = localStorage.getItem("user");
  if (cachedUser) {
    return JSON.parse(cachedUser) as User;
  }
  const newUser: User = { id: Math.random().toString() };
  localStorage.setItem("user", JSON.stringify(newUser));
  return newUser;
};

export const useMessage = ({ event }: { event: BarEventWithSupporters }) => {
  const [user, setUser] = useState<User>();

  const app = useRef<LobbyApp>();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const onChangeNewMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };
  const onSendMessage = () => {
    if (!app.current) return;
    app.current.sendMessage(newMessage);
    setMessages([...messages]);
    setNewMessage("");
  };

  useEffect(() => {
    if (!user) {
      setUser(initUser);
    }
    if (user) {
      app.current = new LobbyApp({
        user,
        event,
        onMessageComing: (message) => {
          setMessages([...messages, message]);
        },
      });
    }
    return () => {
      app.current?.close();
    };
  }, [event, user, messages]);
  return { newMessage, messages, onChangeNewMessage, onSendMessage };
};
