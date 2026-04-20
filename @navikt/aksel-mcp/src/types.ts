import type { z } from "zod";

type ZodInputSchema = Record<string, z.ZodType>;

type ToolResult = {
  content: { type: "text"; text: string }[];
};

type McpTool<T extends ZodInputSchema = ZodInputSchema> = {
  name: string;
  description: string;
  inputSchema: T;
  callback: (args: { [K in keyof T]: z.infer<T[K]> }) => Promise<ToolResult>;
};

type PromptResult = {
  messages: {
    role: "user" | "assistant";
    content: {
      type: "text";
      text: string;
    };
  }[];
};

type McpPrompt<T extends ZodInputSchema = ZodInputSchema> = {
  name: string;
  description: string;
  argsSchema: T;
  callback: (args: { [K in keyof T]: z.infer<T[K]> }) => Promise<PromptResult>;
};

export type { McpTool, ToolResult, ZodInputSchema, McpPrompt, PromptResult };
