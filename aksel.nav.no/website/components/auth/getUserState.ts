import { NextApiRequest } from "next/types";
import { UserStateT } from "@/auth/auth.types";
import { getAuthUser } from "@/auth/getAuthUser";
import { validateWonderwallToken } from "@/auth/validateWonderwall";
import { logger } from "../../config/logger";

export async function getAuthUserState(
  headers: NextApiRequest["headers"],
): Promise<UserStateT> {
  const isSignedIn = await validateWonderwallToken(headers);

  if (!isSignedIn) {
    return {
      signedIn: false,
      user: null,
    };
  }

  const user = getAuthUser(headers);

  if (!user) {
    logger.error(
      "User is signed in, but no user was found in the token. This should be impossible!",
    );
    return {
      signedIn: false,
      user: null,
    };
  }

  return {
    signedIn: true,
    user,
  };
}
