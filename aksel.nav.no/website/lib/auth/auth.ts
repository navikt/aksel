import { GetServerSidePropsContext, NextApiRequest } from "next";
import { isDevelopment } from "..";
import { tokenIsValid } from "./azure";

export function getBearerToken(req) {
  return req.headers?.authorization?.substring("Bearer ".length);
}

/**
 * Used to authenticate Next.JS pages. Assumes application is behind
 * Wonderwall (https://doc.nais.io/security/auth/idporten/sidecar/).
 */
export const isValidated = async (context: GetServerSidePropsContext) => {
  if (isDevelopment()) {
    return false;
  }

  const request = context.req;

  if (request == null) {
    throw new Error("Context is missing request. This should not happen");
  }

  const bearerToken = getBearerToken(request);

  if (!bearerToken) {
    process.env.NODE_ENV !== "production" && console.log("No bearer token");
    return false;
  }

  try {
    await tokenIsValid(bearerToken);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const isValidatedApi = async (req: NextApiRequest) => {
  if (isDevelopment()) {
    return null;
  }

  if (req == null) {
    throw new Error("No request given, this should not happend");
  }

  const bearerToken = getBearerToken(req);

  if (!bearerToken) {
    /* console.log("No bearer token"); */
    return null;
  }

  try {
    const payload = await tokenIsValid(bearerToken);
    return payload;
  } catch (e) {
    console.log(e);
    return null;
  }
};
