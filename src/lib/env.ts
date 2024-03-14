import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),
  PORT: z.string().default("8888"),
  ACCESS_TOKEN_SECRET: z.string().min(32),
  // アクセストークンの有効期間は数字に変換する
  ACCESS_TOKEN_EXPIRES_IN: z
    .string()
    .transform(Number)
    .default((60 * 60 * 24).toString()),
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
