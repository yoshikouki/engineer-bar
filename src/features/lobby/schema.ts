import { Topic } from "@/data";
import { z } from "zod";
import { User } from "../user/schema";

const Id = z.union([z.string().transform((val) => Number(val)), z.number()]);

export const Message = z.object({
  id: z.string(),
  type: z.literal("message"),
  eventId: Id,
  content: z.string(),
  user: User.optional(),
});
export type Message = z.infer<typeof Message>;

export const NewMessage = z.object({
  type: z.literal("newMessage"),
  content: z.string(),
  eventId: Id,
  user: User.optional(),
});

export const TopicsSuggestion = z.object({
  id: z.string(),
  type: z.literal("topicSuggestion"),
  eventId: z.union([z.string().transform((val) => Number(val)), z.number()]),
  topics: z.array(Topic),
});
export type TopicsSuggestion = z.infer<typeof TopicsSuggestion>;

export const IncomingMessage = z.discriminatedUnion("type", [
  Message,
  TopicsSuggestion,
]);
