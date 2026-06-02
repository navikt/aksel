import type { McpPrompt } from "../types.js";

/**
 * Register all prompts here.
 * Each tool should be an object that conforms to the McpTool interface, with a unique name, description, input schema, and callback function.
 *
 *
 * Read more about prompts:
 * - https://modelcontextprotocol.io/docs/learn/server-concepts#prompts
 */
const prompts: McpPrompt<any>[] = [];

export { prompts };
