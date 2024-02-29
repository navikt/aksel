import { AuthApiErrorReturn } from "@/auth/auth.types";

type SlackFeedbackOkResponse = {
  ok: true;
};

export const SlackFeedbackError = {
  InvalidBody: "Invalid body",
  InvalidUser: "Invalid user",
  InvalidId: "Invalid id",
  NoEditors: "No editors",
  NoSlackUsers: "No slack users",
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
