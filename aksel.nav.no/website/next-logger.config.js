/* eslint-disable @typescript-eslint/no-var-requires */
const pino = require("pino");

const logger = (defaultConfig = {}) =>
  pino({
    ...defaultConfig,
    timestamp: false,
    formatters: {
      level: (label) => {
        return { level: label };
      },
      log: (object) => {
        if (object.err) {
          // massage the error object so logs.adeo.no shows stack traces
          const err =
            object.err instanceof Error
              ? pino.stdSerializers.err(object.err)
              : object.err;
          object.stack_trace = err.stack;
          object.type = err.type;
          object.message = err.message;
          delete object.err;
        }

        return object;
      },
    },
  });

module.exports = {
  logger,
};
