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
            {i}: <span className="text-primary">{message.content}</span>
          </div>
        ))}
      </div>

      <nav className="fixed bottom-0 z-10 flex w-full max-w-md justify-center">
        <div className="flex w-screen max-w-md justify-between py-8">
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
