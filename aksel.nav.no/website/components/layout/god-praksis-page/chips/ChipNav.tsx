import cl from "clsx";
import omit from "lodash/omit";
import { useRouter } from "next/router";
import { useId } from "react";
import { Chips, HGrid, Label } from "@navikt/ds-react";
import { capitalize } from "@/utils";
import styles from "./Chips.module.css";
import ScrollFade from "./ScrollFade";

type ChipsNavProps = {
  type: "innholdstype" | "undertema";
  options: string[];
};

function ChipNav({ type, options }: ChipsNavProps) {
  const id = useId();

  const { query, replace } = useRouter();

  function handleSelect(title: string) {
    query[type] === title
      ? replace({ query: omit(query, [type]) }, undefined)
      : replace({ query: { ...query, [type]: title } });
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
          {options.map((option) => (
            <li key={option}>
              <Chips.Toggle
                variant="neutral"
                checkmark={false}
                selected={encodeURIComponent(option) === query?.[type]}
                onClick={() => handleSelect(encodeURIComponent(option))}
              >
                {option}
              </Chips.Toggle>
            </li>
          ))}
        </ul>
      </div>
    </HGrid>
  );
}

export default ChipNav;
