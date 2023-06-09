import { Label } from "@navikt/ds-react";
import { GroupedHitsT, SearchHitT, searchOptions } from "@/types";
import { Hit } from "./Hit";
import React, { useEffect, useMemo, useRef, useState } from "react";

export function Group({
  groups,
  query,
  startIndex,
  logSuccess,
}: {
  groups: GroupedHitsT;
  query: string;
  startIndex: number;
  logSuccess: (index: number, url: string) => void;
}) {
  if (Object.keys(groups).length === 0) {
    return null;
  }

  return (
    <>
      {Object.entries(groups)
        .sort((a, b) => searchOptions[a[0]].index - searchOptions[b[0]].index)
        .map(([key, val], index, arr) => {
          const prev = arr.slice(0, index);
          const total =
            prev.reduce((prev, cur) => prev + cur[1].length, 0) + startIndex;

          return (
            <GroupComponent
              logSuccess={logSuccess}
              startIndex={total}
              key={key}
              heading={`${searchOptions[key].display} (${val.length})`}
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
  startIndex,
  logSuccess,
}: {
  heading: React.ReactNode;
  hits: SearchHitT[];
  query: string;
  startIndex: number;
  logSuccess: (index: number, url: string) => void;
}) {
  const [intersected, setIntersected] = useState(false);
  const item = useRef(null);

  const split = useMemo(() => {
    if (hits.length <= 5) {
      return { initial: hits, lazy: null };
    }

    return { initial: hits.slice(0, 4), lazy: hits.slice(4 + 1) };
  }, [hits]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && setIntersected(entry.isIntersecting);
    });
    item.current && observer.observe(item.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div className="z-10 mt-4 rounded bg-teal-100 p-2">
        <Label className="text-text-default" as="h3">
          {heading}
        </Label>
      </div>
      <ul className="mt-2">
        {split.initial.map((x, xi) => (
          <Hit
            key={xi}
            hit={x}
            query={query}
            index={startIndex + xi}
            logSuccess={logSuccess}
            ref={xi === split.initial.length - 1 ? item : null}
          />
        ))}
        {split.lazy &&
          intersected &&
          split.lazy.map((x, xi) => (
            <Hit
              key={xi}
              hit={x}
              query={query}
              index={startIndex + xi}
              logSuccess={logSuccess}
            />
          ))}
      </ul>
    </div>
  );
}
