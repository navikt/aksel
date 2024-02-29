import { UsersListResponse } from "@slack/web-api";
import { AuthApiErrorReturn } from "@/auth/auth.types";

type SlackFeedbackOkResponse = {
  ok: true;
};

export const SlackFeedbackError = {
  InvalidBody: "InvalidBody",
  InvalidUser: "InvalidUser",
  InvalidId: "InvalidId",
  NoEditors: "NoEditors",
  NoSlackUsers: "NoSlackUsers",
  PostMessageError: "PostMessageError",
} as const;

export type SlackFeedbackErrorT =
  (typeof SlackFeedbackError)[keyof typeof SlackFeedbackError];

type SlackFeedbackErrorResponse = {
  ok: false;
  error: SlackFeedbackErrorT;
};

export type SlackFeedbackResponse =
  | SlackFeedbackOkResponse
  | SlackFeedbackErrorResponse
  | AuthApiErrorReturn;

export type FetchSlackMembersSuccess = {
  ok: true;
  members: Exclude<UsersListResponse["members"], undefined>;
};

export type FetchSlackMembersError = {
  ok: false;
  error: string;
};
