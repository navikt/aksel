import React from "react";
import { ArrowsCirclepathIcon, TrashIcon } from "@navikt/aksel-icons";
import { Button } from "../../../../button";
import { useFileUploadLocale } from "../../FileUpload.context";
import { useLocale } from "../../utils/useLocale";
import { FileItem } from "./types";

interface Props {
  file: FileItem;
  onRetry?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  error?: string;
}

const ItemButton = ({ file, onRetry, onDelete, error }: Props) => {
  const localeCtx = useFileUploadLocale().locale ?? "nb";
  const translation = useLocale(localeCtx, { name: file.name });

  if (error && onRetry) {
    return (
      <Button
        type="button"
        variant="tertiary-neutral"
        onClick={onRetry}
        icon={<ArrowsCirclepathIcon title={translation.retry} />}
      />
    );
  }
  if (onDelete) {
    return (
      <Button
        type="button"
        variant="tertiary-neutral"
        onClick={onDelete}
        icon={<TrashIcon title={translation.delete} />}
      />
    );
  }

  return null;
};

export default ItemButton;
