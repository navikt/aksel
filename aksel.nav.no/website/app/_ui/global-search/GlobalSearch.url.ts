const QUERY_PARAM = "query";

function readQueryParam(): string {
  return (
    new URLSearchParams(window.location.search).get(QUERY_PARAM)?.trim() ?? ""
  );
}

/* Write-only mirror of the query for shareable links. Never drives the search. */
function writeQueryParam(value: string) {
  const url = new URL(window.location.href);
  if (value) {
    url.searchParams.set(QUERY_PARAM, value);
  } else {
    url.searchParams.delete(QUERY_PARAM);
  }
  window.history.replaceState(null, "", url);
}

export { readQueryParam, writeQueryParam };
