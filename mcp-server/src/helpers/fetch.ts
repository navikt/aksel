const defaultFetchTimeoutMs = 10000;

/**
 * A wrapper around the standard `fetch` function that adds a default timeout.
 * Makes sure that if the fetch takes longer than `timeoutMs`, it will be aborted and throw an error.
 */
function fetchWithTimeout(
  input: string | URL | Request,
  init?: RequestInit,
  timeoutMs = defaultFetchTimeoutMs,
) {
  return fetch(input, {
    ...init,
    signal: init?.signal ?? AbortSignal.timeout(timeoutMs),
  });
}

export { fetchWithTimeout };
