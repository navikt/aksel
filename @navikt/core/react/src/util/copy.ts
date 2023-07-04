export default async function copy(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Unable to copy using Clipboard API", err);
    }

    // Fallback for browsers that do not support the Clipboard API.
    const copyKey = /mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl";
    const message = `Kopier til utklippstavle: ${copyKey}+C, Enter`;
    window.prompt(message, text);
  }
}
