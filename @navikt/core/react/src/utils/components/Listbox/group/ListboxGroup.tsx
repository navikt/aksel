import React from "react";
import { useId } from "../../../../utils-external";

interface ListboxGroupProps {
  label: React.ReactNode;
  children: React.ReactNode;
}

function ListboxGroup({ label, children }: ListboxGroupProps) {
  const labelId = useId();

  return (
    <div
      role="group"
      className="aksel-listbox__group"
      aria-labelledby={labelId}
    >
      <div id={labelId} aria-hidden>
        {label}
      </div>
      {children}
    </div>
  );
}

export { ListboxGroup };
