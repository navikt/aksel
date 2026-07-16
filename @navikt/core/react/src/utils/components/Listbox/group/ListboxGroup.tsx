import React from "react";
import { Label } from "../../../../typography";
import { useId } from "../../../../utils-external";

interface ListboxGroupProps {
  label: React.ReactNode;
  children: React.ReactNode;
}

function ListboxGroup({ label, children }: ListboxGroupProps) {
  const labelId = useId();

  return (
    // biome-ignore lint/a11y/useSemanticElements: Fieldset is not generic enough
    <div
      role="group"
      className="aksel-listbox__group"
      aria-labelledby={labelId}
    >
      <Label
        as="div"
        size="small"
        id={labelId}
        aria-hidden
        className="aksel-listbox__group-label"
      >
        {label}
      </Label>
      {children}
    </div>
  );
}

export { ListboxGroup };
