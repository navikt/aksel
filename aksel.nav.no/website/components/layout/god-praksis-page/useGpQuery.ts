import { useRouter } from "next/router";

/**
 * TODO
 * - Is this the best way to get current query? Refactor
 * - Replace temaQuery with already known tema from initialProps, should not be needed here
 */
function useGpQuery(): {
  innholdstypeQuery: string;
  undertemaQuery: string;
  temaQuery: string;
} {
  const { query } = useRouter();

  const innholdstypeQuery = () => {
    const q = decodeURIComponent(query?.innholdstype?.toString?.() ?? "");
    return q.length > 0 ? q : null;
  };

  const undertemaQuery = () => {
    const q = decodeURIComponent(query?.undertema?.toString?.() ?? "");
    return q.length > 0 ? q : null;
  };

  const temaQuery = () => {
    const q = decodeURIComponent(query?.slug?.toString?.() ?? "");
    return q.length > 0 ? q : null;
  };

  return {
    innholdstypeQuery: innholdstypeQuery(),
    undertemaQuery: undertemaQuery(),
    temaQuery: temaQuery(),
  };
}

export default useGpQuery;
