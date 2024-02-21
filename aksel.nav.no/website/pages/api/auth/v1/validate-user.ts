/* validateWonderwallToken */
import { NextApiRequest, NextApiResponse } from "next/types";
import { validateWonderwallToken } from "../../../../components/auth/validate-auth";

export default async function validateUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log("validating users");
  const validUser: boolean = await validateWonderwallToken(req);

  console.log("valid user: ", validUser);
  if (validUser) {
    res.status(200).json({ message: "User is valid" });
    return;
  }
  res.status(401).json({ message: "User is not valid" });
  return;
}
