import { z } from "zod";

import rawJSON from "@/data/data.json";

export const Location = z.object({
  name: z.string(),
  address: z.string(),
});

export const Segment = z.object({
  id: z.number(),
  name: z.string(),
  start_time: z.coerce.date(),
  end_time: z.coerce.date(),
});

export const Supporter = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string().url(),
});

export const Event = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string().url(),
  start_time: z.coerce.date(),
  end_time: z.coerce.date(),
  max_participants: z.number(),
  participants_count: z.number(),
  location: Location,
  segments: z.array(Segment),
  supporters: z.array(z.number()),
});

export const Data = z.object({
  events: z.record(Event),
  supporters: z.record(Supporter),
});

export type Data = {
  events: Record<number, Event>;
};

export const data = Data.parse(rawJSON);
