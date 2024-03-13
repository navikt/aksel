import cl from "clsx";
import omit from "lodash/omit";
import { useRouter } from "next/router";
import { useId } from "react";
import { FileFillIcon, TagFillIcon } from "@navikt/aksel-icons";
import { Label } from "@navikt/ds-react";
import { capitalize } from "@/utils";
import styles from "./Chips.module.css";

export type ChipsRenderData = { title: string; count: number }[];

type GpChipRowProps = {
  type: "innholdstype" | "undertema";
  entries: [string, number][];
};

export function GpChipRow({ type, entries }: GpChipRowProps) {
  const id = useId();

  const { query, replace } = useRouter();

  const handleClick = async (titleRaw: string) => {
    const title = encodeURIComponent(titleRaw);

    query[type] === title
      ? replace({ query: omit(query, [type]) }, undefined, {
          shallow: true,
        })
      : replace({ query: { ...query, [type]: title } }, undefined, {
          shallow: true,
        });
  };

  return (
    <div
      /* TODO: After release of new GP structure this could be removed since all articles will required proper data, thus always having chips */
      className="hidden has-[.chiplist]:grid"
    >
      <Label
        as="span"
        className={cl("flex items-center gap-1 text-aksel-heading", {
          "text-violet-600": type === "innholdstype",
          "text-teal-700": type === "undertema",
        })}
      >
        {type == "undertema" && <TagFillIcon fontSize="20" aria-hidden />}
        {type == "innholdstype" && <FileFillIcon fontSize="20" aria-hidden />}
        {capitalize(type)}
      </Label>

      <div className="relative mt-2">
        <ul id={id} className={cl("flex flex-wrap gap-2 p-1", styles.chips)}>
          {entries
            .filter((entry) => entry[0] !== "null")
            .map(([entryName, count]) => {
              return (
                <li key={entryName} className="chiplist">
                  <button
                    aria-pressed={
                      encodeURIComponent(entryName) === query?.[type]
                    }
                    onClick={() => handleClick(entryName)}
                    className={cl(
                      "grid min-h-8 place-content-center whitespace-nowrap rounded-full bg-surface-neutral-subtle px-3 py-1 ring-1 ring-inset transition-opacity focus:outline-none focus-visible:shadow-focus-gap aria-pressed:text-text-on-inverted",
                      "disabled:bg-surface-neutral-subtle disabled:opacity-40 disabled:ring-border-default",
                      {
                        "ring-violet-700/50 hover:bg-violet-50 aria-pressed:bg-violet-700 hover:aria-pressed:bg-violet-800":
                          type === "innholdstype",
                        "ring-teal-700/50 hover:bg-teal-50 aria-pressed:bg-teal-700 hover:aria-pressed:bg-teal-800":
                          true,
                      },
                    )}
                    disabled={count === 0}
                  >
                    {`${entryName} (${count})`}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
