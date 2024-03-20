import { env } from "@/lib/env";
import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { sign, verify } from "hono/jwt";

export type AccessTokenPayload = {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  nbf: number;
  iat: number;
  jti: string;
};
export const AccessTokenKey = "access_token";
const domain =
  env.NODE_ENV === "development" ? "localhost" : "engineer-bar.com";

export const createAccessToken = async (userId: string) => {
  const newAccessToken = await sign(
    {
      iss: "engineer-bar",
      sub: userId,
      aud: `https://${domain}`,
      exp: Math.floor(Date.now() / 1000) + env.ACCESS_TOKEN_EXPIRES_IN,
      nbf: Math.floor(Date.now() / 1000),
      iat: Math.floor(Date.now() / 1000),
      jti: crypto.randomUUID(),
    },
    env.ACCESS_TOKEN_SECRET,
  );
  return newAccessToken;
};

export const setAccessToken = async (c: Context, token: string) => {
  setCookie(c, AccessTokenKey, token, {
    path: "/",
    httpOnly: true,
    maxAge: env.ACCESS_TOKEN_EXPIRES_IN,
    sameSite: "Strict",
    ...(env.NODE_ENV === "production" && {
      secure: true,
      domain,
    }),
  });
};

export const generateAccessToken = async (c: Context, userId: string) => {
  const newAccessToken = await createAccessToken(userId);
  await setAccessToken(c, newAccessToken);
  return newAccessToken;
};

export const getAccessToken = async (c: Context) => {
  const accessToken = await getCookie(c, AccessTokenKey);
  if (!accessToken) {
    return null;
  }
  try {
    const decodedPayload: AccessTokenPayload = await verify(
      accessToken,
      env.ACCESS_TOKEN_SECRET,
    );
    return decodedPayload;
  } catch (e) {
    console.error(new Error("Invalid access token:"), e);
    clearAccessToken(c);
    return null;
  }
};

export const clearAccessToken = (c: Context) => {
  deleteCookie(c, AccessTokenKey, {
    path: "/",
    secure: true,
    domain,
  });
};
