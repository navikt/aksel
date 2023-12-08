import { useRouter } from "next/router";
import { useMemo } from "react";

function useGpQuery(): {
  innholdstypeQuery: string;
  undertemaQuery: string;
  temaQuery: string;
} {
  const { query } = useRouter();

  const innholdstypeQuery = useMemo(() => {
    const q = decodeURIComponent(query?.innholdstype?.toString?.() ?? "");
    return q.length > 0 ? q : null;
  }, [query?.innholdstype]);

  const undertemaQuery = useMemo(() => {
    const q = decodeURIComponent(query?.undertema?.toString?.() ?? "");
    return q.length > 0 ? q : null;
  }, [query?.undertema]);

  const temaQuery = useMemo(() => {
    const q = decodeURIComponent(query?.slug?.toString?.() ?? "");
    return q.length > 0 ? q : null;
  }, [query?.slug]);

  return { innholdstypeQuery, undertemaQuery, temaQuery };
}

export default useGpQuery;
