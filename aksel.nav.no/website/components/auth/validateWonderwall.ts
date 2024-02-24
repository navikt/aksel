import { NextApiRequest } from "next/types";
import { validateAzureToken } from "@navikt/next-auth-wonderwall";
import { logger } from "../../config/logger";

/**
 * Validates the wonderwall token according to nais.io. Should only actually redirect if the token has expired.
 */
export async function validateWonderwallToken(
  headers: NextApiRequest["headers"],
): Promise<boolean> {
  /* if (isLocal) {
      logger.warn('Is running locally, skipping RSC auth')
      return
  } */

  const bearerToken: string | null | undefined = headers["authorization"];

  if (!bearerToken) {
    return false;
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
    return false;
  }

  return true;
}
