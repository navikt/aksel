import React from "react";
import { ArrowsCirclepathIcon, TrashIcon } from "@navikt/aksel-icons";
import { Button } from "../../../../button";
import { FileItem } from "./types";
import { getDeleteText, getRetryText } from "./utils/i18n";

interface Props {
  file: FileItem;
  locale: "nb" | "nn" | "en";
  onRetry?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  error?: string;
}

const ItemButton = ({ file, locale, onRetry, onDelete, error }: Props) => {
  if (error && onRetry) {
    return (
      <Button
        type="button"
        variant="tertiary-neutral"
        onClick={onRetry}
        icon={<ArrowsCirclepathIcon title={getRetryText(locale, file.name)} />}
      />
    );
  }
  if (onDelete) {
    return (
      <Button
        type="button"
        variant="tertiary-neutral"
        onClick={onDelete}
        icon={<TrashIcon title={getDeleteText(locale, file.name)} />}
      />
    );
  }

  return null;
};

export default ItemButton;
