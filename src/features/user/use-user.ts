import { hc } from "hono/client";
import { useEffect, useState } from "react";
import { z } from "zod";

import type { AppType } from "@/index";

export const User = z.object({
  id: z.string(),
});
export type User = z.infer<typeof User>;

export const client = hc<AppType>("/");

const initUser = async () => {
  const cachedUser = localStorage.getItem("user");
  if (cachedUser) {
    return JSON.parse(cachedUser) as User;
  }

  const res = await client.api.user.$get();
  if (!res.ok) {
    console.error("Failed to fetch user:", res.status, res.statusText);
  }
  const newUser = await res.json();
  console.log("newUser", newUser);
  localStorage.setItem("user", JSON.stringify(newUser));
  return newUser;
};

export const useUser = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    (async () => setUser(await initUser()))();
  }, []);

  return { user, setUser };
};
