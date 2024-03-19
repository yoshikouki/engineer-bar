import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { BarEventWithSupporters } from "@/hooks/use-data";
import { env } from "@/lib/env.client";
import { useLobby } from "./use-lobby";

export const LobbyChat = ({ event }: { event: BarEventWithSupporters }) => {
  const { messages, suggestion, onSendMessage } = useLobby({
    event,
  });
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      message: "",
    },
  });
  const onSubmit = (data: { message: string }) => {
    onSendMessage(data.message);
    reset();
  };

  const isTopicsVisible = suggestion.topics || env.DEV;
  const onTopicClick = (topic: string) => {
    setValue("message", topic);
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
        {isTopicsVisible && (
          <ScrollArea>
            <div className="flex w-full max-w-md gap-2 whitespace-nowrap px-4">
              {suggestion.topics?.topics.map((s) => (
                <Button
                  key={s.id}
                  variant="outline"
                  onClick={() => onTopicClick(s.content)}
                >
                  <span className="text-primary">{s.content}</span>
                </Button>
              ))}
              <Button
                variant="outline"
                onClick={() => onTopicClick("興味を惹かれるトピック")}
              >
                <span className="text-primary">興味を惹かれるトピック</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => onTopicClick("最近のやらかし")}
              >
                <span className="text-primary">最近のやらかし</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => onTopicClick("愛用エディター")}
              >
                <span className="text-primary">愛用エディター</span>
              </Button>
            </div>
          </ScrollArea>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-md justify-between gap-2 px-4 pt-2 pb-8"
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
