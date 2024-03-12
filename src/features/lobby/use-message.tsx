import { BarEventWithSupporters } from "@/hooks/use-data";
import { useEffect, useRef, useState } from "react";

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

export const useMessage = ({ event }: { event: BarEventWithSupporters }) => {
  const [user, setUser] = useState<User>();

  const socketRef = useRef<WebSocket>();
  const [isOpen, setIsOpen] = useState(false);
  const [isWaitingToReconnect, setIsWaitingToReconnect] = useState(false);

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const onChangeNewMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };
  const onSendMessage = () => {
    if (!socketRef.current) return;
    socketRef.current.send(newMessage);
    setMessages([...messages]);
    setNewMessage("");
  };

  useEffect(() => {
    if (!user) {
      setUser(initUser);
    }
    if (isWaitingToReconnect) {
      return;
    }
    if (!socketRef.current) {
      const socket = new WebSocket("ws://localhost:8888/ws");
      socketRef.current = socket;

      socket.addEventListener("open", () => {
        setIsOpen(true);
        console.log("WebSocket is connected.");
      });
      socket.addEventListener("message", (event) => {
        const message: Message = JSON.parse(event.data);
        console.log("onMessage: message:", message);
        setMessages((prev) => [...prev, message]);
      });
      socket.addEventListener("close", () => {
        if (socketRef.current) {
          console.log("WebSocket is closed by server. Reconnect in 5 seconds.");
        } else {
          console.log("WebSocket closed by app component unmount");
          return;
        }
        if (isWaitingToReconnect) {
          return;
        }
        setIsOpen(false);
        setIsWaitingToReconnect(true);
        setTimeout(() => {
          console.log("Reconnecting...");
          setIsWaitingToReconnect(false);
        }, 5000);
        console.log("disconnected");
      });
      socket.addEventListener("error", (error) => {
        console.error("Error", error);
      });
    }
  }, [user, isWaitingToReconnect]);

  return { newMessage, messages, onChangeNewMessage, onSendMessage };
};
