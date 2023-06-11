import { searchOptions } from "@/types";
import { Skeleton as DsSkeleton } from "@navikt/ds-react";
import { useContext } from "react";
import { SearchResultContext } from "./providers";

export const Error = () => {
  const { isValidating, error } = useContext(SearchResultContext);

  if (error) {
    return (
      <p className="[grid-area:results]" aria-live="assertive">
        Noe gikk galt! Last siden på nytt eller ta kontakt med Aksel.
      </p>
    );
  }
  if (!isValidating) {
    return null;
  }

  return (
    <>
      <div className="mt-16 hidden [grid-area:filter] md:block">
        <div className="grid gap-4">
          {Object.keys(searchOptions).map((_, xi) => (
            <span key={xi} className="flex items-center gap-4">
              <DsSkeleton height="2rem" width="2rem" variant="rectangle" />
              <DsSkeleton height="2rem" width="80%" variant="text" />
            </span>
          ))}
        </div>
      </div>
      <div className="w-full [grid-area:input]">
        <div className="grid gap-2">
          <DsSkeleton width="10rem" variant="text" />
          <DsSkeleton height="3rem" variant="rounded" />
        </div>
      </div>
    </>
  );
};
