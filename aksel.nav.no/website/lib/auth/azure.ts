import { createRemoteJWKSet, errors, jwtVerify } from "jose";
import {
  FlattenedJWSInput,
  GetKeyFunction,
  JWSHeaderParameters,
  JWTPayload,
} from "jose/dist/types/types";
import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig();

const clientId = serverRuntimeConfig.azureAppClientId;
const issuer = serverRuntimeConfig.azureAppIssuer;
const jwksUri = serverRuntimeConfig.azureJwksUri;

let remoteJWKSet: GetKeyFunction<JWSHeaderParameters, FlattenedJWSInput>;

export const opprettRemoteJWKSet = () => {
  const jwksUrl = new URL(jwksUri);
  remoteJWKSet = createRemoteJWKSet(jwksUrl);
};

export const tokenIsValid = async (
  accessToken: string
): Promise<JWTPayload> => {
  try {
    if (!remoteJWKSet) opprettRemoteJWKSet();

    const { payload } = await jwtVerify(accessToken, remoteJWKSet, {
      audience: clientId,
      issuer: issuer,
    });

    return Promise.resolve(payload);
  } catch (error) {
    let feilmelding: string;
    if (error instanceof errors.JWTExpired) {
      feilmelding = "Token har utløpt";
    } else if (error instanceof errors.JWTInvalid) {
      feilmelding = "Payload i tokenet må være gyldig JSON!";
    } else if (error instanceof errors.JWTClaimValidationFailed) {
      feilmelding = `Token mottatt har ugyldig claim ${error.claim}`;
    } else {
      feilmelding = "Token er ugyldig";
    }
    return Promise.reject(new Error(feilmelding));
  }
};
