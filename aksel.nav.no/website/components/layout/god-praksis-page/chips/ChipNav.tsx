import cl from "clsx";
import omit from "lodash/omit";
import { useRouter } from "next/router";
import { useId } from "react";
import { Chips, HGrid, Label } from "@navikt/ds-react";
import { capitalize } from "@/utils";
import { GpChipDataT } from "../types";
import styles from "./Chips.module.css";
import ScrollFade from "./ScrollFade";

type ChipsNavProps = {
  type: "innholdstype" | "undertema";
  data?: GpChipDataT["chipData"];
  slug?: string;
};

function ChipNav({ type, data, slug }: ChipsNavProps) {
  console.log({ slug });

  const id = useId();

  const { query, replace } = useRouter();

  function handleSelect(title: string) {
    query[type] === title
      ? replace({ query: omit(query, [type]) }, undefined, { shallow: true })
      : replace({ query: { ...query, [type]: title } }, undefined, {
          shallow: true,
        });
  }

  return (
    <HGrid gap="2" columns={{ sm: 1, md: "auto 1fr" }} align="center">
      <Label as="p" className="text-aksel-heading">
        {`${capitalize(type)}`}
      </Label>

      <div className="relative overflow-hidden">
        <ScrollFade wrapperId={id} />
        <ul
          id={id}
          className={cl("overflow-x-scroll flex gap-2 p-1", styles.chips)}
        >
          {data.map((entry) => (
            <li key={entry.title}>
              <Chips.Toggle
                variant="neutral"
                checkmark={false}
                selected={encodeURIComponent(entry.title) === query?.[type]}
                onClick={() => handleSelect(encodeURIComponent(entry.title))}
                className="whitespace-nowrap"
              >
                {`${entry.title} ${entry.count}`}
              </Chips.Toggle>
            </li>
          ))}
        </ul>
      </div>
    </HGrid>
  );
}

export default ChipNav;
