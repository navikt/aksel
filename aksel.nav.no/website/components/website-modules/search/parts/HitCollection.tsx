import { Tag } from "@/cms/frontpage-blocks/latest-articles/Tag";
import { GroupedHitsT, SearchHitT, searchOptions } from "@/types";
import { Heading } from "@navikt/ds-react";
import cl from "clsx";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Hit } from "./Hit";

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
        .map(
          (
            [key, val]: [key: keyof typeof searchOptions, val: SearchHitT[]],
            index,
            arr
          ) => {
            const prev = arr.slice(0, index);
            const total =
              prev.reduce((prev2, cur) => prev2 + cur[1].length, 0) +
              startIndex;

            return (
              <Collection
                startIndex={total}
                key={key}
                heading={`${searchOptions[key].display} (${val.length})`}
                tag={key}
                hits={val}
              />
            );
          }
        )}
    </>
  );
}

export function Collection({
  heading,
  hits,
  startIndex,
  simple = false,
  tag,
}: {
  heading?: React.ReactNode;
  hits: SearchHitT[] | Omit<SearchHitT, "score" | "anchor">[];
  simple?: boolean;
  startIndex: number;
  tag?: Partial<keyof typeof searchOptions>;
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
      {heading && tag && (
        <h3
          className={cl("sticky top-0 z-10 p-2 px-4 md:px-10", {
            "bg-deepblue-50": ["komponent_artikkel", "ds_artikkel"].includes(
              tag
            ),
            "bg-violet-50": ["aksel_prinsipp", "aksel_standalone"].includes(
              tag
            ),
            "bg-teal-50": tag === "aksel_artikkel",
            "bg-pink-50": tag === "aksel_blogg",
          })}
        >
          <Tag hTag="span" type={tag} size="small" inline count={hits.length} />
        </h3>
      )}
      {heading && !tag && (
        <Heading
          className="bg-surface-subtle sticky top-0 z-10 p-2 px-4  md:px-10"
          size="small"
          level="3"
        >
          {heading}
        </Heading>
      )}
      <ul className="mt-2 px-0 md:px-6">
        {split.initial.map((x, xi) => (
          <Hit
            key={xi}
            hit={x}
            index={startIndex + xi}
            ref={xi === split.initial.length - 1 ? item : null}
            simple={simple}
            tag={tag}
          />
        ))}
        {split.lazy &&
          intersected &&
          split.lazy.map((x, xi) => (
            <Hit
              key={xi}
              hit={x}
              index={startIndex + xi}
              simple={simple}
              tag={tag}
            />
          ))}
      </ul>
    </div>
  );
}
