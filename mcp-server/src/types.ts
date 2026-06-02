import type { z } from "zod";

type ZodInputSchema = Record<string, z.ZodType>;

type ToolResult = string;

type McpTool<T extends ZodInputSchema = ZodInputSchema> = {
  name: string;
  description: string;
  inputSchema: T;
  callback: (args: { [K in keyof T]: z.infer<T[K]> }) => Promise<ToolResult>;
};

type PromptResult = string;

type McpPrompt<T extends ZodInputSchema = ZodInputSchema> = {
  name: string;
  description: string;
  argsSchema: T;
  callback: (args: { [K in keyof T]: z.infer<T[K]> }) => Promise<PromptResult>;
};

type ResourceResult = {
  contents: { uri: string; mimeType?: string; text: string }[];
};

type McpResource = {
  name: string;
  uri: string;
  description?: string;
  mimeType?: string;
  callback: (uri: URL) => Promise<ResourceResult>;
};

export type {
  McpPrompt,
  McpResource,
  McpTool,
  PromptResult,
  ResourceResult,
  ToolResult,
  ZodInputSchema,
};
