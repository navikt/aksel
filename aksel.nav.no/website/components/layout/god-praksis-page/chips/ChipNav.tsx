import cl from "clsx";
import { useId, useState } from "react";
import { Chips, HGrid, Label } from "@navikt/ds-react";
import styles from "./Chips.module.css";
import ScrollFade from "./ScrollFade";

type ChipsNavProps = {
  type: "innholdstype" | "undertema";
  options: string[];
};

function ChipNav({ options }: ChipsNavProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const id = useId();

  if (!options) {
    console.warn("Missing options");
    return null;
  }

  function handleSelect(title) {
    setSelected(title);
  }

  return (
    <HGrid gap="2" columns={{ sm: 1, md: "auto 1fr" }} align="center">
      <Label as="p" className="text-aksel-heading">
        Innholdstyper:
      </Label>

      <div className="relative overflow-hidden">
        <ScrollFade wrapperId={id} />
        <ul
          id={id}
          className={cl(
            "overflow-x-scroll flex gap-2 overscroll-contain",
            styles.chips
          )}
        >
          {options.map((option) => (
            <li key={option}>
              <Chips.Toggle
                variant="neutral"
                checkmark={false}
                selected={option === selected}
                handleSelect={() => handleSelect(option)}
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
