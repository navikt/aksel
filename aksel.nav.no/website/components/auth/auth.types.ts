import { NextApiRequest, NextApiResponse } from "next/types";

export type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<unknown> | unknown;

export type AuthUser = {
  name: "name";
  email: "email";
};

export const AuthApiErrorReturn = {
  "Access denied": "Access denied",
} as const;

export type AuthApiErrorReturn = {
  ok: false;
  error: (typeof AuthApiErrorReturn)[keyof typeof AuthApiErrorReturn];
};

type LoggedInT = {
  signedIn: true;
  user: AuthUser;
};

type NotLoggedInT = {
  signedIn: false;
  user: null;
};

export type UserStateT = LoggedInT | NotLoggedInT;
