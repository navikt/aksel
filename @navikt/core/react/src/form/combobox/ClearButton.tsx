import React from "react";
import { Close } from "@navikt/ds-icons";

interface ClearButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  handleClear: (event: any) => void;
  clearButtonLabel?: string;
}

export const ClearButton: React.FC<ClearButtonProps> = ({
  handleClear,
  clearButtonLabel,
}) => {
  return (
    <button
      type="button"
      onClick={handleClear}
      className="navds-combobox__button-clear"
    >
      <span className="navds-sr-only">
        {clearButtonLabel ? clearButtonLabel : "Tøm"}
      </span>
      <Close aria-hidden width="20" height="20" />
    </button>
  );
};

export default ClearButton;
