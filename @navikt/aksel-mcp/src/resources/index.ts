import type { McpResource } from "../types.js";

/**
 * Register all resources here.
 * Each resource should be an object that conforms to the McpResource interface, with a unique name, URI, and callback function.
 *
 * Read more about resources:
 * - https://modelcontextprotocol.io/docs/learn/server-concepts#resources
 */
const resources: McpResource[] = [];

export { resources };
