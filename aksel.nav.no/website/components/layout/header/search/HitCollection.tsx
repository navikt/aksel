import { Label } from "@navikt/ds-react";
import { GroupedHitsT, SearchHitT, searchOptions } from "@/types";
import { Hit } from "./Hit";
import React, { useEffect, useMemo, useRef, useState } from "react";

export function CollectionMapper({
  groups,
  startIndex,
}: {
  groups: GroupedHitsT;
  startIndex: number;
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
            <Collection
              startIndex={total}
              key={key}
              heading={`${searchOptions[key].display} (${val.length})`}
              hits={val}
            />
          );
        })}
    </>
  );
}

export function Collection({
  heading,
  hits,
  startIndex,
  simple = false,
}: {
  heading?: React.ReactNode;
  hits: SearchHitT[] | Omit<SearchHitT, "score" | "anchor">[];
  simple?: boolean;
  startIndex: number;
}) {
  const [intersected, setIntersected] = useState(false);
  const item = useRef(null);

  const split = useMemo(() => {
    if (hits.length <= (simple ? 20 : 5)) {
      return { initial: hits, lazy: null };
    }

    return { initial: hits.slice(0, 4), lazy: hits.slice(4 + 1) };
  }, [hits, simple]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && setIntersected(entry.isIntersecting);
    });
    item.current && observer.observe(item.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {heading && (
        <div className="sticky -top-[1px] z-10 bg-teal-100/95  p-2">
          <Label className="px-2 md:px-8" as="h3">
            {heading}
          </Label>
        </div>
      )}
      <ul className="mt-2 px-0 md:px-6">
        {split.initial.map((x, xi) => (
          <Hit
            key={xi}
            hit={x}
            index={startIndex + xi}
            ref={xi === split.initial.length - 1 ? item : null}
            simple={simple}
          />
        ))}
        {split.lazy &&
          intersected &&
          split.lazy.map((x, xi) => (
            <Hit key={xi} hit={x} index={startIndex + xi} simple={simple} />
          ))}
      </ul>
    </div>
  );
}
