import cl from "clsx";
import omit from "lodash/omit";
import { useRouter } from "next/router";
import { useId } from "react";
import { FileFillIcon, TagFillIcon } from "@navikt/aksel-icons";
import { HGrid, Label } from "@navikt/ds-react";
import { capitalize } from "@/utils";
import styles from "./Chips.module.css";
import ScrollFade from "./ScrollFade";

export type ChipsRenderData = { title: string; count: number }[];

type ChipsNavProps = {
  type: "innholdstype" | "undertema";
  data?: ChipsRenderData;
};

/**
 * TODO:
 * - On initial load, scroll selected into view
 */
function ChipNav({ type, data }: ChipsNavProps) {
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
        className={cl("text-aksel-heading flex gap-2 items-center", {
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
          className={cl("overflow-x-scroll flex gap-2 p-1", styles.chips)}
        >
          {data.map((entry) => (
            <li key={entry.title}>
              <button
                aria-pressed={encodeURIComponent(entry.title) === query?.[type]}
                onClick={() => handleClick(entry.title)}
                className={cl(
                  "whitespace-nowrap focus:outline-none transition-opacity focus-visible:shadow-focus-gap ring-1 ring-inset px-3 py-1 min-h-8 grid aria-pressed:text-text-on-inverted place-content-center bg-surface-neutral-subtle rounded-full",
                  "disabled:bg-surface-neutral-subtle disabled:ring-border-default disabled:opacity-40",
                  {
                    "hover:bg-violet-50 ring-violet-700/50 aria-pressed:bg-violet-700 hover:aria-pressed:bg-violet-800":
                      type === "innholdstype",
                    "hover:bg-teal-50 ring-teal-700/50 aria-pressed:bg-teal-700 hover:aria-pressed:bg-teal-800":
                      type === "undertema",
                  }
                )}
                disabled={entry.count === 0}
              >
                {`${entry.title} (${entry.count})`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </HGrid>
  );
}

export default ChipNav;
