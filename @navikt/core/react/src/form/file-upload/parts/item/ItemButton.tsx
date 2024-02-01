import React from "react";
import { ArrowsCirclepathIcon, TrashIcon } from "@navikt/aksel-icons";
import { Button } from "../../../../button";
import { useFileUploadLocale } from "../../FileUpload.context";
import { useLocale } from "../../utils/useLocale";
import { FileItem } from "./Item.types";

interface Props {
  file: FileItem;
  onRetry?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  error?: string;
  status?: "delete" | "retry";
}

const ItemButton = ({ file, onRetry, onDelete, error, status }: Props) => {
  const localeCtx = useFileUploadLocale().locale ?? "nb";
  const translation = useLocale(localeCtx, { name: file.name });

  if (error && onRetry && status === "retry") {
    return (
      <Button
        className="navds-file-item__button"
        type="button"
        variant="tertiary-neutral"
        onClick={onRetry}
        icon={<ArrowsCirclepathIcon title={translation.retry} />}
      />
    );
  }
  if (onDelete && status === "delete") {
    return (
      <Button
        className="navds-file-item__button"
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
