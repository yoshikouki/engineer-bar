import { data } from "@/data";

export const useData = () => {
  const events = Object.values(data.events) || [];
  return { events };
};
