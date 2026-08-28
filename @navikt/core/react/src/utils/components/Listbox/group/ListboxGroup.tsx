import React from "react";
import { Detail } from "../../../../typography";
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
      <Detail
        as="div"
        id={labelId}
        aria-hidden
        className="aksel-listbox__group-label"
      >
        {label}
      </Detail>
      {children}
    </div>
  );
}

export { ListboxGroup };
