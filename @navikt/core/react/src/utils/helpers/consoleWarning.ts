const sentMessages = new Set<string>();

function consoleWarning(key: string, ...content: unknown[]) {
  if (process.env.NODE_ENV !== "production") {
    if (!sentMessages.has(key)) {
      console.warn("[Aksel]", ...content);
      sentMessages.add(key);
    }
  }
}

export { consoleWarning };
