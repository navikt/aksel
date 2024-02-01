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
  action: "delete" | "retry" | "none";
}

const ItemButton = ({ file, onRetry, onDelete, action }: Props) => {
  const localeCtx = useFileUploadLocale().locale ?? "nb";
  const translation = useLocale(localeCtx, { name: file.name });

  if (action === "none") {
    return null;
  }

  if (onRetry && action === "retry") {
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
  if (onDelete && action === "delete") {
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
