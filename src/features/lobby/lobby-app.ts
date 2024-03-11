import { BarEventWithSupporters } from "@/hooks/use-data";

export type Message = {
  id: string;
  content: string;
  user: User;
};

export type User = {
  id: string;
};

export class LobbyApp {
  private socket: WebSocket;
  private user: User;
  private event: BarEventWithSupporters;
  private onMessageComing?: (message: Message) => void;

  constructor({
    user,
    event,
    onMessageComing,
    socket = new WebSocket("ws://localhost:8888/ws"),
  }: {
    user: User;
    event: BarEventWithSupporters;
    onMessageComing?: (message: Message) => void;
    socket?: WebSocket;
  }) {
    this.user = user;
    this.event = event;
    this.onMessageComing = onMessageComing;

    socket.addEventListener("open", () => {
      console.log("connected");
    });
    socket.addEventListener("message", this.onMessageEvent);
    socket.addEventListener("close", () => {
      console.log("disconnected");
    });
    socket.addEventListener("error", (error) => {
      console.error("Error", error);
    });
    this.socket = socket;
  }

  sendMessage(message: string) {
    this.socket.send(message);
  }

  private onMessageEvent = (event: MessageEvent) => {
    if (!this.onMessageComing) return;
    console.log("onMessageEvent: event.data:", event.data);
    const message: Message = JSON.parse(event.data);
    this.onMessageComing(message);
  };

  close() {
    this.socket.close();
  }
}
