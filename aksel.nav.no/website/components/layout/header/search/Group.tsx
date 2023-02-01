import { Label } from "@navikt/ds-react";
import { GroupedHits, SearchHit, options } from "./types";
import { Hit } from "./Hit";
import React from "react";

export function Group({
  groups,
  query,
}: {
  groups: GroupedHits;
  query: string;
}) {
  if (Object.keys(groups).length === 0) {
    // TODO: Empty-state?
    return null;
  }

  return (
    <>
      {Object.entries(groups)
        .sort((a, b) => options[a[0]].index - options[b[0]].index)
        .map(([key, val]) => {
          return (
            <GroupComponent
              key={key}
              heading={`${options[key].display} (${val.length})`}
              hits={val}
              query={query}
            />
          );
        })}
    </>
  );
}

export function GroupComponent({
  heading,
  hits,
  query,
}: {
  heading: React.ReactNode;
  hits: SearchHit[];
  query: string;
}) {
  return (
    <div>
      <div className="z-10 mt-4 rounded bg-teal-100 p-2">
        <Label className="text-text-default" as="h3">
          {heading}
        </Label>
      </div>
      <ul className="mt-2">
        {hits.map((x) => (
          <React.Fragment key={x.item._id}>
            <Hit key={x.item._id} hit={x} query={query} />
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
