import { z } from "zod";

import { events, BarEvent } from "./raw/events";
import { Supporter, supporters } from "./raw/supporters";
import { Topic, topics } from "./raw/topics";

export const Data = z.object({
  events: z.record(BarEvent),
  supporters: z.record(Supporter),
  topics: z.array(Topic),
});
export type Data = z.infer<typeof Data>;

export const data = Data.parse({
  events,
  supporters,
  topics,
});
export { BarEvent };
