/* eslint-disable @typescript-eslint/no-require-imports */
export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    /**
     * This forces next.js's module tracing output (standalone) to include these libraries, because they are
     * otherwise never seen by the module tracer.
     */
    await require("pino");
    /**
     * next-logger (not to be confused with @navikt/next-logger) monkey-patches console log and the Next.js logger
     * and needs to be initialized as early as possible. We use next's instrumentation hooks for this.
     */
    await require("next-logger");
  }
}
