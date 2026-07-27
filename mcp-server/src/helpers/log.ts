type LogLevel = "info" | "warn" | "error";

type LogDetails = Record<string, unknown>;

function log(level: LogLevel, message: string, details?: LogDetails) {
  const payload = {
    level,
    message,
    ...(details ?? {}),
  };

  const line = JSON.stringify(payload);

  if (level === "info") {
    console.info(line);
    return;
  }

  if (level === "warn") {
    console.warn(line);
    return;
  }

  console.error(line);
}

function logWarn(message: string, details?: LogDetails) {
  log("warn", message, details);
}

function logError(message: string, details?: LogDetails) {
  log("error", message, details);
}

function logInfo(message: string, details?: LogDetails) {
  log("info", message, details);
}

export { logError, logInfo, logWarn };
