import { useRouter } from "next/router";

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
