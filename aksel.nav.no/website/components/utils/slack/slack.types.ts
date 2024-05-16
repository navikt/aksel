import type { AuthApiErrorReturn } from "@/auth/auth.types";

export type SlackFeedbackInput = {
  /**
   * Feedback message
   */
  feedback: string;
  /**
   * If user wants to be anonymous
   */
  anon: boolean;
  /**
   * Sanity-document id for article feedback is about
   */
  document_id: string;
};

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

export type SanitizedUser = {
  id: string;
  email: string;
};

export type FetchSlackMembersSuccess = {
  ok: true;
  members: SanitizedUser[];
};

export type FetchSlackMembersError = {
  ok: false;
  error: string;
};
