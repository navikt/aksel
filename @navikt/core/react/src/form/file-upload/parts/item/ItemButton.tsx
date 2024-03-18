import React from "react";
import { ArrowsCirclepathIcon, TrashIcon } from "@navikt/aksel-icons";
import { Button } from "../../../../button";
import { FileItem } from "./Item.types";

interface Props {
  file: FileItem;
  onRetry?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  action: "delete" | "retry" | "none";
  retryTitle: string;
  deleteTitle: string;
}

const ItemButton = ({
  onRetry,
  onDelete,
  action,
  retryTitle,
  deleteTitle,
}: Props) => {
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
        icon={<ArrowsCirclepathIcon title={retryTitle} />}
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
        icon={<TrashIcon title={deleteTitle} />}
      />
    );
  }

  return null;
};

export default ItemButton;
