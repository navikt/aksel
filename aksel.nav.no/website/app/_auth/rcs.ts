import { headers } from "next/headers";
import "server-only";
import { logger } from "@navikt/next-logger";
import { getToken, validateToken } from "@navikt/oasis";

const isLocalOrDemo = process.env.NODE_ENV !== "production";

async function isUserLoggedIn(): Promise<boolean> {
  if (isLocalOrDemo) {
    return true;
  }

  const requestHeaders = await headers();
  const token = getToken(requestHeaders);

  if (!token) {
    return false;
  }

  const validationResult = await validateToken(token);
  return validationResult.ok;
}

async function verifyUserLoggedIn(): Promise<
  | {
      ok: true;
      user: ReturnType<typeof getAuthUser>;
    }
  | { ok: false; user: null }
> {
  const requestHeaders = await headers();

  if (isLocalOrDemo) {
    logger.warn("Running locally, skipping RSC wonderwall auth");
    return {
      ok: true,
      user: getAuthUser(
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IjlHbW55RlBraGMzaE91UjIybXZTdmduTG83WSJ9.eyJhdWQiOiJmYWtlLWF1ZCIsImlzcyI6Imh0dHBzOi8vbG9naW4ubWljcm9zb2Z0b25saW5lLmNvbS85NjZhYzU3Mi1mNWI3LTRiYmUtYWE4OC1jNzY0MTljMGY4NTEvdjIuMCIsImlhdCI6MTY5ODQxMTU0NiwibmJmIjoxNjk4NDExNTQ2LCJleHAiOjE2OTg0MTY1MjYsImFpbyI6ImZha2UtYWlvIiwiYXpwIjoiZmFrZS1henAiLCJhenBhY3IiOiIyIiwiZ3JvdXBzIjpbImZha2UtZ3JvdXAiXSwibmFtZSI6IkZha2UgVG9rZW5lbnNzb24iLCJvaWQiOiJmYWtlLW9pZCIsInByZWZlcnJlZF91c2VybmFtZSI6ImZha2UtbG9uZy1lbWFpbC1hdEBleGFtcGxlLm5vIiwicmgiOiJmYWtlLXJoLiIsInNjcCI6ImRlZmF1bHRhY2Nlc3MiLCJzdWIiOiJmYWtlLXN1YiIsInRpZCI6ImZha2UtdGlkIiwidXRpIjoiekY4R0VGemhfRTZya3gtYzNnNFNBQSIsInZlciI6IjIuMCIsIk5BVmlkZW50IjoiWjk5MjM4OSIsImF6cF9uYW1lIjoiZGV2LWdjcDpmYWtlLXRlYW06aGVsc2VzamVray1ib3QifQ.OOP_Q0ZcUI6jQzM1UON9mA8d8BU_GhioQ5OLuepwebg",
      ),
    };
  }

  const token = getToken(requestHeaders);
  if (!token) {
    logger.info("Found no token");
    return {
      ok: false,
      user: null,
    };
  }

  const validationResult = await validateToken(token);

  if (!validationResult.ok) {
    if (validationResult.errorType !== "token expired") {
      logger.error(
        new Error(
          `Invalid JWT token found (cause: ${validationResult.errorType} ${validationResult.error.message}`,
          { cause: validationResult.error },
        ),
      );
    }

    return {
      ok: false,
      user: null,
    };
  }

  return {
    ok: true,
    user: getAuthUser(token),
  };
}

function getAuthUser(token: string): {
  name: string;
  email: string;
} {
  const jwt = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString("utf8"),
  );

  return {
    name: jwt.name,
    email: jwt.preferred_username,
  };
}

export { verifyUserLoggedIn, isUserLoggedIn };
