import { z } from "zod";

const envSchema = z.object({
  DEV: z
    .boolean()
    .optional()
    .transform((v) => {
      return (
        v ??
        (import.meta.env.NODE_ENV === "development" ||
          import.meta.env.MODE === "development")
      );
    }),
});

export type Env = z.infer<typeof envSchema>;

const parsedEnv = envSchema.safeParse(import.meta.env);
if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsedEnv.error.flatten().fieldErrors,
  );
  throw new Error("Invalid environment variables");
}
const env = parsedEnv.data;

export { env };
