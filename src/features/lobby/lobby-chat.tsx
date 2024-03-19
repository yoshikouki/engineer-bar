import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { BarEventWithSupporters } from "@/hooks/use-data";
import { useLobby } from "./use-lobby";

export const LobbyChat = ({ event }: { event: BarEventWithSupporters }) => {
  const { messages, suggestion, onSendMessage } = useLobby({
    event,
  });
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      message: "",
    },
  });
  const onSubmit = (data: { message: string }) => {
    onSendMessage(data.message);
    reset();
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        Message
        {messages.map((message) => (
          <div key={message.id} className="flex gap-2">
            {message.user?.id.slice(0, 2)}
            <span className="text-primary">{message.content}</span>
          </div>
        ))}
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-10 flex w-full flex-col justify-center bg-gradient-to-t from-background/90 via-70% via-background/60 to-background/0">
        {suggestion.topics && (
          <ScrollArea className="w-full max-w-md whitespace-nowrap rounded-md border">
            <div>
              {suggestion.topics.topics.map((s) => (
                <div key={s.id} className="flex gap-2">
                  <span className="text-primary">{s.content}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-md justify-between gap-2 px-4 py-8"
        >
          <Input
            type="text"
            placeholder="話したこと、話したいことを共有しよう！"
            {...register("message", { required: true })}
          />
          <Button type="submit">Send</Button>
        </form>
      </nav>
    </>
  );
};
