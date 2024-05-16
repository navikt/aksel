import type { NextApiRequest } from "next/types";
import { logger } from "@navikt/next-logger";
import { getToken, validateAzureToken } from "@navikt/oasis";

/**
 * Validates the wonderwall token according to nais.io. Should only actually redirect if the token has expired.
 */
export async function validateWonderwallToken(
  headers: NextApiRequest["headers"],
): Promise<boolean> {
  if (process.env.NODE_ENV !== "production") {
    logger.info("Is running locally, skipping RSC auth");
    return true;
  }

  const bearerToken = getToken(headers.authorization ?? "");

  if (!bearerToken) {
    return false;
  }

  const validationResult = await validateAzureToken(bearerToken);

  if (!validationResult.ok) {
    if (validationResult.errorType !== "token expired") {
      logger.error(
        new Error(
          `Invalid JWT token found (cause: ${validationResult.errorType} ${validationResult.error}`,
          { cause: validationResult.error },
        ),
      );
    } else {
      logger.error(
        `JWT token has expired (cause: ${validationResult.errorType} ${validationResult.error}`,
      );
    }
    return false;
  }

  return true;
}
