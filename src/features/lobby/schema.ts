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
  content: z.string(),
  eventId: Id,
  user: User.optional(),
});

const TalkThemeSuggestion = z.object({
  id: z.string(),
  type: z.literal("talkThemeSuggestion"),
  eventId: z.union([z.string().transform((val) => Number(val)), z.number()]),
  content: z.array(z.string()),
});
