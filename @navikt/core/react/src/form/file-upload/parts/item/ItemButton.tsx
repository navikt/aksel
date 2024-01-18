import React from "react";
import { ArrowsCirclepathIcon, TrashIcon } from "@navikt/aksel-icons";
import { Button } from "../../../../button";
import { useFileUploadLocale } from "../../FileUpload.context";
import { FileItem } from "./types";
import { getDeleteText, getRetryText } from "./utils/i18n";

interface Props {
  file: FileItem;
  onRetry?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  error?: string;
}

const ItemButton = ({ file, onRetry, onDelete, error }: Props) => {
  const localeCtx = useFileUploadLocale().locale ?? "nb";
  if (error && onRetry) {
    return (
      <Button
        type="button"
        variant="tertiary-neutral"
        onClick={onRetry}
        icon={
          <ArrowsCirclepathIcon title={getRetryText(localeCtx, file.name)} />
        }
      />
    );
  }
  if (onDelete) {
    return (
      <Button
        type="button"
        variant="tertiary-neutral"
        onClick={onDelete}
        icon={<TrashIcon title={getDeleteText(localeCtx, file.name)} />}
      />
    );
  }

  return null;
};

export default ItemButton;
