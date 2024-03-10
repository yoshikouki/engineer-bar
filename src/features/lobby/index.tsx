import { useEffect } from "react";

export const Lobby = ({ eventId }: { eventId: number }) => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8888/ws");

    socket.addEventListener("open", () => {
      console.log("connected");
    });
    socket.addEventListener("message", (event) => {
      console.log("Message from server ", event.data);
    });
    socket.addEventListener("close", () => {
      console.log("disconnected");
    });

    return () => {
      socket.close();
    };
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center p-4 gap-4">
        <h2 className="font-black text-5xl text-primary">{eventId}</h2>
      </div>
    </>
  );
};
