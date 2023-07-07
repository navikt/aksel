import React from "react";
import { XMarkIcon } from "@navikt/aksel-icons";

interface ClearButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  handleClear: (event: any) => void;
  clearButtonLabel?: string;
}

export const ClearButton: React.FC<ClearButtonProps> = ({
  handleClear,
  clearButtonLabel,
  ...rest
}) => {
  return (
    <button
      type="button"
      onClick={handleClear}
      className="navds-combobox__button-clear"
      {...rest}
    >
      <span className="navds-sr-only">
        {clearButtonLabel ? clearButtonLabel : "Tøm"}
      </span>
      <XMarkIcon aria-hidden />
    </button>
  );
};

export default ClearButton;
