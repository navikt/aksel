import { logger } from "@navikt/next-logger";
import { ApiHandler } from "@/auth/auth.types";
import { validateWonderwallToken } from "@/auth/validateWonderwall";

/**
 * Used to authenticate Next.JS pages. Assumes application is behind
 * Wonderwall (https://doc.nais.io/security/auth/idporten/sidecar/). Will deny requests if Wonderwall cookie is missing.
 */
export function authProtectedApi(handler: ApiHandler): ApiHandler {
  return async function validateWonderwallHandler(req, res, ...rest) {
    if (process.env.NODE_ENV !== "production") {
      logger.info(
        "Is running locally or in demo, skipping authentication for API",
      );
      return handler(req, res, ...rest);
    }

    const validatedToken = await validateWonderwallToken(req.headers);

    if (!validatedToken) {
      res.status(401).json({ message: "Access denied" });
      return;
    }

    return handler(req, res, ...rest);
  };
}
