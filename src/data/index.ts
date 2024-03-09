import { z } from "zod";

import rawJSON from "@/data/data.json";
import { BarEvent } from "./index";

export const Location = z.object({
  name: z.string(),
  address: z.string(),
});
export type Location = z.infer<typeof Location>;

export const Segment = z.object({
  id: z.number(),
  name: z.string(),
  start_time: z.coerce.date(),
  end_time: z.coerce.date(),
});
export type Segment = z.infer<typeof Segment>;

export const Supporter = z.object({
  id: z.number(),
  name: z.string(),
  short_name: z.string(),
  url: z.string().url(),
});
export type Supporter = z.infer<typeof Supporter>;

export const BarEvent = z.object({
  id: z.number(),
  name: z.string(),
  sub_title: z.string().optional(),
  url: z.string().url(),
  start_time: z.coerce.date(),
  end_time: z.coerce.date(),
  max_participants: z.number(),
  participants_count: z.number(),
  location: Location,
  segments: z.array(Segment),
  supporters: z.array(z.number()),
});
export type BarEvent = z.infer<typeof BarEvent>;
export type BarEventWithSupporters = Omit<BarEvent, "supporters"> & {
  supporters: Supporter[];
};

export const Data = z.object({
  events: z.record(BarEvent),
  supporters: z.record(Supporter),
});
export type Data = z.infer<typeof Data>;

export const data = Data.parse(rawJSON);
