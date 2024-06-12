import { Skeleton as AkselSkeleton } from "@navikt/ds-react";
import { searchOptions } from "@/types";
import { useSearchResult } from "../providers";

export const Skeleton = () => {
  const { isValidating, error } = useSearchResult();

  if (error) {
    return (
      <p aria-live="assertive" className="mx-auto w-fit px-6 py-24">
        Noe gikk galt! Last siden på nytt eller ta kontakt med Aksel.
      </p>
    );
  }

  if (!isValidating) {
    return null;
  }

  return (
    <div className="grid w-full gap-2 p-1">
      <AkselSkeleton height="3rem" variant="rounded" />

      <div className="flex flex-wrap gap-2 px-4 pb-4 md:px-10">
        {Object.keys(searchOptions)
          .slice(0, Object.keys(searchOptions).length - 1)
          .map((x, i) => (
            <AkselSkeleton variant="rounded" height="1.75rem" key={i}>
              {searchOptions[x].display}
            </AkselSkeleton>
          ))}
      </div>
    </div>
  );
};
