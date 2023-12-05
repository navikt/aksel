import cl from "clsx";
import { useState } from "react";
import { Chips, Label, Stack } from "@navikt/ds-react";
import styles from "./Chips.module.css";

type ChipsNavProps = {
  type: "innholdstype" | "undertema";
  options: string[];
};

function ChipNav({ options }: ChipsNavProps) {
  const [selected, setSelected] = useState<string | null>(null);

  if (!options) {
    console.warn("Missing options");
    return null;
  }

  function handleSelect(title) {
    setSelected(title);
  }

  return (
    <Stack
      gap="2"
      align={{ sm: "start", md: "center" }}
      direction={{ sm: "column", md: "row" }}
      wrap={false}
    >
      <Label as="p" className="text-aksel-heading">
        Innholdstyper:
      </Label>
      <ul className={cl("overflow-x-auto flex gap-2", styles.chips)}>
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
    </Stack>
  );
}

export default ChipNav;
