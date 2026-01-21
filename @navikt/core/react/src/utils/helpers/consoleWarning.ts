const sentMessages = new Set<string>();

function consoleWarning(...content: unknown[]) {
  if (process.env.NODE_ENV !== "production") {
    const key = content.join();
    if (!sentMessages.has(key)) {
      console.warn("[Aksel]", ...content);
      sentMessages.add(key);
    }
  }
}

export { consoleWarning };
