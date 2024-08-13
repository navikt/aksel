import cl from "clsx";
import omit from "lodash/omit";
import { useRouter } from "next/router";
import { useId } from "react";
import { FileFillIcon, TagFillIcon } from "@navikt/aksel-icons";
import { Label } from "@navikt/ds-react";
import { GpChip } from "@/layout/god-praksis-page/chipnavigation/GpChip";
import { safeString } from "@/layout/god-praksis-page/useGpViews";
import { capitalize } from "@/utils";
import styles from "./Chips.module.css";

export type ChipsRenderData = { title: string; count: number }[];

type GpChipRowProps = {
  type: "innholdstype" | "undertema";
  entries: [string, number][];
};

export function GpChipRow({ type, entries }: GpChipRowProps) {
  const id = useId();

  const { query, push } = useRouter();

  const reset = () => {
    push({ query: omit(query, [type]) }, undefined, {
      shallow: true,
    });
  };

  const handleClick = (titleRaw: string) => {
    query[type] === titleRaw
      ? reset()
      : push({ query: { ...query, [type]: titleRaw } }, undefined, {
          shallow: true,
        });
  };

  return (
    <div>
      <Label
        as="h2"
        className={cl("flex items-center gap-1 text-aksel-heading", {
          "text-violet-600": type === "innholdstype",
          "text-teal-700": type === "undertema",
        })}
      >
        {type === "undertema" && <TagFillIcon fontSize="20" aria-hidden />}
        {type === "innholdstype" && <FileFillIcon fontSize="20" aria-hidden />}
        {capitalize(type)}
      </Label>

      <div className="relative mt-2">
        <ul id={id} className={cl("flex flex-wrap gap-2 p-1", styles.chips)}>
          <li>
            <GpChip
              type={type}
              disabled={false}
              onClick={reset}
              pressed={!safeString(query?.[type])}
            >
              {`Alle (${entries.reduce((acc, [, count]) => acc + count, 0)})`}
            </GpChip>
          </li>
          {entries.map(([entryName, count]) => {
            return (
              <li key={entryName}>
                <GpChip
                  type={type}
                  disabled={count === 0}
                  onClick={() => handleClick(entryName)}
                  pressed={entryName === safeString(query?.[type])}
                >{`${entryName} (${count})`}</GpChip>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
