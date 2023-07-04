import pino from "pino";
import { logger as sharedPinoConfig } from "./next-logger.config";

/**
 * This logger is not isomorphic, and should only be used on the server
 */
export const logger: pino.Logger = sharedPinoConfig();
