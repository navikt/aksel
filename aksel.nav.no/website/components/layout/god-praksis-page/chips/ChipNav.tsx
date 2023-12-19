import cl from "clsx";
import omit from "lodash/omit";
import { useRouter } from "next/router";
import { useId } from "react";
import { FileFillIcon, TagFillIcon } from "@navikt/aksel-icons";
import { Chips, HGrid, HStack, Label } from "@navikt/ds-react";
import { capitalize } from "@/utils";
import { ChipsData } from "../types";
import styles from "./Chips.module.css";
import ScrollFade from "./ScrollFade";

type ChipsNavProps = {
  type: "innholdstype" | "undertema";
  data?: ChipsData;
};

export type ChipsRenderData = { title: string; count: number }[];

const countUniques = (
  type: "innholdstype" | "undertema",
  data: ChipsData
): ChipsRenderData => {
  const lens =
    type == "innholdstype" ? "innholdstype-title" : "undertema-title";
  const map = new Map<string, number>();
  for (const entry of data) {
    const count = map.get(entry[lens]) || 0;
    map.set(entry[lens], count + 1);
  }
  const chipData = [];
  for (const [key, value] of map.entries()) {
    chipData.push({ title: key, count: value });
  }
  return chipData;
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

  const selectionCount = countUniques(type, data);

  return (
    <HGrid gap="2" columns={{ md: 1, lg: "auto 1fr" }} align="center">
      <Label
        as="span"
        className={cl("text-aksel-heading", styles[`label--${type}`])}
      >
        <HStack as="span" gap="2" align="center">
          {type == "undertema" && <TagFillIcon fontSize="20" aria-hidden />}
          {type == "innholdstype" && <FileFillIcon fontSize="20" aria-hidden />}
          {capitalize(type)}
        </HStack>
      </Label>

      <div className="relative overflow-hidden">
        <ScrollFade id={id} />
        <ul
          id={id}
          className={cl("overflow-x-scroll flex gap-2 p-1", styles.chips)}
        >
          {selectionCount.map((entry) => (
            <li key={entry.title}>
              <Chips.Toggle
                variant="neutral"
                checkmark={false}
                selected={encodeURIComponent(entry.title) === query?.[type]}
                onClick={() => handleClick(entry.title)}
                className={cl("whitespace-nowrap", styles[`chip--${type}`])}
              >
                {`${entry.title} (${entry.count})`}
              </Chips.Toggle>
            </li>
          ))}
        </ul>
      </div>
    </HGrid>
  );
}

export default ChipNav;
