import { searchOptions } from "@/types";
import { Skeleton } from "@navikt/ds-react";
import { useContext } from "react";
import { SearchResultContext } from "./providers";

export const Error = () => {
  const { isValidating, error } = useContext(SearchResultContext);

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
      <Skeleton height="3rem" variant="rounded" />

      <div className="flex flex-wrap gap-2 px-4 pb-4 md:px-10">
        {Object.keys(searchOptions)
          .slice(0, Object.keys(searchOptions).length - 1)
          .map((x, i) => (
            <Skeleton variant="rounded" height="1.75rem" key={i}>
              {searchOptions[x].display}
            </Skeleton>
          ))}
      </div>
    </div>
  );
};
