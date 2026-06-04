const defaultFetchTimeoutMs = 10000;

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
