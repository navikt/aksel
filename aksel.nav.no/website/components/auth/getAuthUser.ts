import { NextApiRequest } from "next/types";
import { AuthUser } from "@/auth/auth.types";

export function getAuthUser(
  headers: NextApiRequest["headers"],
): AuthUser | null {
  const token = getToken(headers);
  if (!token) {
    return null;
  }

  const jwt = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString("utf8"),
  );

  return {
    name: jwt.name,
    email: jwt.preferred_username,
  };
}

export const fakeToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IjlHbW55RlBraGMzaE91UjIybXZTdmduTG83WSJ9.eyJhdWQiOiJmYWtlLWF1ZCIsImlzcyI6Imh0dHBzOi8vbG9naW4ubWljcm9zb2Z0b25saW5lLmNvbS85NjZhYzU3Mi1mNWI3LTRiYmUtYWE4OC1jNzY0MTljMGY4NTEvdjIuMCIsImlhdCI6MTY5ODQxMTU0NiwibmJmIjoxNjk4NDExNTQ2LCJleHAiOjE2OTg0MTY1MjYsImFpbyI6ImZha2UtYWlvIiwiYXpwIjoiZmFrZS1henAiLCJhenBhY3IiOiIyIiwiZ3JvdXBzIjpbImZha2UtZ3JvdXAiXSwibmFtZSI6IkZha2UgVG9rZW5lbnNzb24iLCJvaWQiOiJmYWtlLW9pZCIsInByZWZlcnJlZF91c2VybmFtZSI6ImZha2UtbG9uZy1lbWFpbC1hdEBleGFtcGxlLm5vIiwicmgiOiJmYWtlLXJoLiIsInNjcCI6ImRlZmF1bHRhY2Nlc3MiLCJzdWIiOiJmYWtlLXN1YiIsInRpZCI6ImZha2UtdGlkIiwidXRpIjoiekY4R0VGemhfRTZya3gtYzNnNFNBQSIsInZlciI6IjIuMCIsIk5BVmlkZW50IjoiWjk5MjM4OSIsImF6cF9uYW1lIjoiZGV2LWdjcDpmYWtlLXRlYW06aGVsc2VzamVray1ib3QifQ.OOP_Q0ZcUI6jQzM1UON9mA8d8BU_GhioQ5OLuepwebg";

export function getToken(headers: NextApiRequest["headers"]) {
  if (process.env.NODE_ENV !== "production") return fakeToken;

  return headers.authorization?.replace("Bearer ", "") ?? null;
}
