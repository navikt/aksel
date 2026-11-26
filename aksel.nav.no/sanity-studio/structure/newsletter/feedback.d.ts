export type FeedbackT = {
  status: "success" | "warning" | "error";
  message: string;
} | null;
