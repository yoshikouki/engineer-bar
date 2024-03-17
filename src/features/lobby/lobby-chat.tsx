import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { BarEventWithSupporters } from "@/hooks/use-data";
import { useLobby } from "./use-lobby";

export const LobbyChat = ({ event }: { event: BarEventWithSupporters }) => {
  const { newMessage, messages, onChangeNewMessage, onSendMessage } = useLobby({
    event,
  });

  return (
    <>
      <div className="flex flex-col gap-4">
        Message
        {messages.map((message, i) => (
          <div key={message.id} className="flex gap-2">
            {message.user?.id.slice(0, 2)}
            <span className="text-primary">{message.content}</span>
          </div>
        ))}
      </div>

      <nav className="fixed bottom-0 left-0 z-10 flex w-full max-w-md justify-center bg-gradient-to-t from-background/90 via-70% via-background/60 to-background/0">
        <div className="flex w-full justify-between gap-2 px-4 py-8">
          <Input
            type="text"
            placeholder="そういえばアレについて話したいんじゃなかった？"
            value={newMessage}
            onChange={onChangeNewMessage}
          />
          <Button onClick={onSendMessage}>Send</Button>
        </div>
      </nav>
    </>
  );
};
