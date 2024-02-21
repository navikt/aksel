import { NextApiRequest, NextApiResponse } from "next/types";
import { validateAzureToken } from "@navikt/next-auth-wonderwall";
import { logger } from "../../config/logger";

/* import { TokenPayload } from "./auth.types"; */

type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<unknown> | unknown;

export function withAuthenticatedApi(handler: ApiHandler): ApiHandler {
  return async function withBearerTokenHandler(req, res, ...rest) {
    /* if (isLocalOrDemo) {
          return handler(req, res, ...rest)
      } */

    const bearerToken: string | null | undefined = req.headers["authorization"];

    const validatedToken = bearerToken
      ? await validateAzureToken(bearerToken)
      : null;

    if (validatedToken !== "valid") {
      if (validatedToken.errorType !== "EXPIRED") {
        logger.error(
          new Error(
            `Invalid JWT token found (cause: ${validatedToken.errorType} ${validatedToken.message}, redirecting to login.`,
            { cause: validatedToken.error },
          ),
        );
      }
      res.status(401).json({ message: "Access denied" });
      return;
    }

    return handler(req, res, ...rest);
  };
}

/**
 * Validates the wonderwall token according to nais.io. Should only actually redirect if the token has expired.
 */
export async function validateWonderwallToken(req: NextApiRequest) {
  const requestHeaders = req.headers;

  /* if (isLocal) {
      logger.warn('Is running locally, skipping RSC auth')
      return
  } */

  const bearerToken: string | null | undefined =
    requestHeaders["authorization"];

  if (!bearerToken) {
    /* redirect(`/oauth2/login?redirect=${redirectPath}`) */
  }

  const validationResult = await validateAzureToken(bearerToken);

  if (validationResult !== "valid") {
    if (validationResult.errorType !== "EXPIRED") {
      logger.error(
        new Error(
          `Invalid JWT token found (cause: ${validationResult.errorType} ${validationResult.message}, redirecting to login.`,
          { cause: validationResult.error },
        ),
      );
    }

    /* redirect(`/oauth2/login?redirect=${redirectPath}`) */
  }
}

export function getUser(headers: NextApiRequest["headers"]): {
  name: string;
  email: string;
} {
  const token = getToken(headers);
  const jwt = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString("utf8"),
  );

  return {
    name: jwt.name,
    email: jwt.preferred_username,
  };
}

/* export const fakeToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IjlHbW55RlBraGMzaE91UjIybXZTdmduTG83WSJ9.eyJhdWQiOiJmYWtlLWF1ZCIsImlzcyI6Imh0dHBzOi8vbG9naW4ubWljcm9zb2Z0b25saW5lLmNvbS85NjZhYzU3Mi1mNWI3LTRiYmUtYWE4OC1jNzY0MTljMGY4NTEvdjIuMCIsImlhdCI6MTY5ODQxMTU0NiwibmJmIjoxNjk4NDExNTQ2LCJleHAiOjE2OTg0MTY1MjYsImFpbyI6ImZha2UtYWlvIiwiYXpwIjoiZmFrZS1henAiLCJhenBhY3IiOiIyIiwiZ3JvdXBzIjpbImZha2UtZ3JvdXAiXSwibmFtZSI6IkZha2UgVG9rZW5lbnNzb24iLCJvaWQiOiJmYWtlLW9pZCIsInByZWZlcnJlZF91c2VybmFtZSI6ImZha2UtbG9uZy1lbWFpbC1hdEBleGFtcGxlLm5vIiwicmgiOiJmYWtlLXJoLiIsInNjcCI6ImRlZmF1bHRhY2Nlc3MiLCJzdWIiOiJmYWtlLXN1YiIsInRpZCI6ImZha2UtdGlkIiwidXRpIjoiekY4R0VGemhfRTZya3gtYzNnNFNBQSIsInZlciI6IjIuMCIsIk5BVmlkZW50IjoiWjk5MjM4OSIsImF6cF9uYW1lIjoiZGV2LWdjcDpmYWtlLXRlYW06aGVsc2VzamVray1ib3QifQ.OOP_Q0ZcUI6jQzM1UON9mA8d8BU_GhioQ5OLuepwebg"; */

export function getToken(headers: NextApiRequest["headers"]) {
  /* if (isLocal) return fakeToken */

  return headers.authorization?.replace("Bearer ", "") ?? null;
}
