import { useCallback, useEffect, useRef, useState } from "react";

type UseWebSocketProps = {
  url: {
    queries?: Record<string, string | number>;
  };
  onOpen?: (event: Event) => void;
  onMessage?: (event: MessageEvent) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;

  onSend?: (message: Message) => void;
  onReconnect?: () => void;
  onDisconnect?: () => void;
};

type Message = Record<string | number | symbol, unknown>;

const convertQueries = (queries: Record<string, string | number>) => {
  const searchParams = new URLSearchParams();
  for (const key in queries) {
    searchParams.set(key, queries[key].toString());
  }
  return searchParams.toString();
};

export const useWebSocket = (props: UseWebSocketProps) => {
  const socketRef = useRef<WebSocket>();
  const [messages, setMessages] = useState<Message[]>([]);

  const isConnecting = socketRef.current !== undefined;

  const connect = useCallback(() => {
    if (socketRef.current) {
      console.log("WebSocket is already open.");
      if (props.onReconnect) props.onReconnect();
      return;
    }

    let url = import.meta.env.WEBSOCKET_URL || "ws://localhost:8888/ws";
    if (props?.url?.queries) {
      url += `?${convertQueries(props.url.queries)}`;
    }
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.addEventListener("open", (event) => {
      console.log("WebSocket is connected.");
      if (props.onOpen) props.onOpen(event);
    });
    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
      if (props.onMessage) props.onMessage(event);
    });
    socket.addEventListener("close", (event) => {
      console.log("WebSocket is closed.");
      socketRef.current = undefined;
      if (props.onClose) props.onClose(event);
    });
    socket.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
      socketRef.current = undefined;
      if (props.onError) props.onError(error);
    });
  }, [
    props.url.queries,
    props.onOpen,
    props.onMessage,
    props.onClose,
    props.onError,
    props.onReconnect,
  ]);

  const sendMessage = useCallback(
    (message: Message) => {
      if (!socketRef.current) return;
      socketRef.current.send(JSON.stringify(message));
      if (props.onSend) props.onSend(message);
    },
    [props.onSend],
  );

  const disconnect = useCallback(() => {
    if (!socketRef.current) return;
    socketRef.current.close();
    socketRef.current = undefined;
    if (props.onDisconnect) props.onDisconnect();
  }, [props.onDisconnect]);

  useEffect(() => {
    return () => disconnect();
  }, [disconnect]);

  return { connect, disconnect, sendMessage, messages, isConnecting };
};
