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

export type { McpTool, ToolResult, ZodInputSchema };
