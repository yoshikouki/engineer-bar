import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarEventWithSupporters } from "@/hooks/use-data";
import { useMessage } from "./use-message";

export const LobbyChat = ({ event }: { event: BarEventWithSupporters }) => {
  const { newMessage, messages, onChangeNewMessage, onSendMessage } =
    useMessage({ event });

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

      <nav className="fixed bottom-0 z-10 max-w-md w-full flex justify-center">
        <div className="flex justify-between py-8 max-w-md w-screen">
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
