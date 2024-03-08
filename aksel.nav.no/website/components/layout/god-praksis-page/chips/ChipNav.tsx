import cl from "clsx";
import omit from "lodash/omit";
import { useRouter } from "next/router";
import { useId } from "react";
import { FileFillIcon, TagFillIcon } from "@navikt/aksel-icons";
import { HGrid, Label } from "@navikt/ds-react";
import { useGpViews } from "@/layout/god-praksis-page/useGpViews";
import { capitalize } from "@/utils";
import styles from "./Chips.module.css";
import ScrollFade from "./ScrollFade";

export type ChipsRenderData = { title: string; count: number }[];

type ChipsNavProps = {
  type: "innholdstype" | "undertema";
  data: Record<string, Record<string, number>>;
};

/**
 * TODO:
 * - On initial load, scroll selected into view
 */
function ChipNav({ type, data }: ChipsNavProps) {
  const view = useGpViews();

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
    <HGrid gap="2" columns={{ md: 1, lg: "auto 1fr" }} align="center">
      <Label
        as="span"
        className={cl("flex items-center gap-2 text-aksel-heading", {
          "text-violet-600": type === "innholdstype",
          "text-teal-700": type === "undertema",
        })}
      >
        {type == "undertema" && <TagFillIcon fontSize="20" aria-hidden />}
        {type == "innholdstype" && <FileFillIcon fontSize="20" aria-hidden />}
        {capitalize(type)}
      </Label>

      <div className="relative overflow-hidden scroll-smooth">
        <ScrollFade id={id} />
        <ul
          id={id}
          className={cl("flex gap-2 overflow-x-scroll p-1", styles.chips)}
        >
          {Object.entries(data)?.map(([entry, innholdstype]) => {
            const count = Object.values(innholdstype).reduce((acc, curr) => {
              if (view.view === "undertema") {
                return entry === view.undertema ? acc + curr : acc;
              }
              return acc + curr;
            }, 0);
            return (
              <li key={entry}>
                <button
                  aria-pressed={encodeURIComponent(entry) === query?.[type]}
                  onClick={() => handleClick(entry)}
                  className={cl(
                    "grid min-h-8 place-content-center whitespace-nowrap rounded-full bg-surface-neutral-subtle px-3 py-1 ring-1 ring-inset transition-opacity focus:outline-none focus-visible:shadow-focus-gap aria-pressed:text-text-on-inverted",
                    "disabled:bg-surface-neutral-subtle disabled:opacity-40 disabled:ring-border-default",
                    {
                      /* "ring-violet-700/50 hover:bg-violet-50 aria-pressed:bg-violet-700 hover:aria-pressed:bg-violet-800":
                        type === "innholdstype", */
                      "ring-teal-700/50 hover:bg-teal-50 aria-pressed:bg-teal-700 hover:aria-pressed:bg-teal-800":
                        true,
                    },
                  )}
                  disabled={count === 0}
                >
                  {`${entry} (${count})`}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </HGrid>
  );
}

export default ChipNav;
